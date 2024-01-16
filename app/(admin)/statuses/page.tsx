'use client'

import Image from 'next/image';

import Tag from '@ui/tag';
import Button from "@ui/button";
import Heading from "@ui/heading";

import AddIcon from "@icons/add.svg";
import EditIcon from "@icons/edit.svg";
import RightIcon from "@icons/right.svg";

import defaultUser from '@icons/leads.svg';

import Form from './form';
import Header from "@ui/header";

import { useEffect, useState } from 'react';
import { searchStatuses } from './actions';

import Action from '@/app/ui/action';
import NoRecord from '@/app/ui/noRecord';
import Filters from '@/app/ui/filters';
import { convertFiltersToQuery } from '@/app/functions';
import Alert from '@/app/ui/alert';
import { statusTypeOptions } from '@/app/constants';

interface PropsObject {

}

const Statuses: React.FC<PropsObject> = () => {

  const [response, setReponse] = useState()
  const [statusForm, setStatusForm] = useState({})
  const [statusModal, setStatusModal] = useState(false);
  const [modalHeading, setModalHeading] = useState('');

  const [statuses, setStatuses] = useState([]);
  const [statusesCount, setStatuesCount] = useState(0);

  const [filters, setFilters] = useState({ query: "", status: "", skip: 0, take: 20 })


  useEffect(() => {
    fetchStatuses(filters)
  }, [])

  useEffect(() => {

    const delay = setTimeout(() => {
      fetchStatuses(filters)
    }, 500)

    return () => clearTimeout(delay)

  }, [filters])

  const fetchStatuses = (newFilters: any) => {

    searchStatuses(convertFiltersToQuery(newFilters)).then(result => {
      if (result?.records) {
        setStatuses(result.records)
        setStatuesCount(result.total)
      }
    });

  }


  return (

    <>
      {statusModal && <Form
        statusForm={statusForm}
        setStatusForm={(newLead: any) => setStatusForm(newLead)}
        heading={modalHeading}
        closeModal={() => setStatusModal(false)}
        refreshStatuses={() => fetchStatuses(filters)}
        setResponse={(message: any) => setReponse(message)}
      />}

      {response && <Alert response={response} setResponse={(value: any) => setReponse(value)} />}

      <Header>
        <Button lable="New Status" icon={AddIcon} onClick={() => {
          setModalHeading('create status')
          setStatusModal(!statusModal)
          setStatusForm({});
        }} />
      </Header>

      <Filters filters={filters} setFilters={setFilters} count={statusesCount} />

        {statuses?.length ?
          <table className="w-full table-auto text-sm">
            <tbody className='bg-zinc-100 text-zinc-500 font-bold'>
              <tr>
                <td className='py-2 mb-3 px-4 rounded-tl-xl rounded-bl-xl'>type</td>
                <td className='py-2 mb-3 px-4'>style</td>
                <td className='py-2  mb-3 px-4 text-center'>status</td>
                <td className='py-2  mb-3 px-4 rounded-tr-xl rounded-br-xl text-end'>action</td>
              </tr>
            </tbody>
            <tbody>
              {statuses.map((status: any, index: number) => (
                <tr key={index}>
                  <td className='pt-2 px-4'>{status.type}</td>
                  <td className='pt-2 px-4'>{status.style}</td>
                  <td className='pt-2 px-4 text-center'><Tag label={status.value} className={status.style} /></td>
                  <td className='pt-2 px-4 text-right'> <Action className="p-2" width={30} icon={EditIcon} onClick={() => {
                    setModalHeading('update company')
                    setStatusForm(status);
                    setStatusModal(true);
                  }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          :
          <NoRecord label="statuses" />
        }



    </>
  )

}

export default Statuses;