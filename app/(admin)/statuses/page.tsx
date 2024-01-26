'use client'


import Tag from '@ui/tag';
import Button from "@ui/button";
import AddIcon from "@icons/add.svg";
import EditIcon from "@icons/edit.svg";
import CopyIcon from "@icons/copy.svg";

import Form from './form';
import Header from "@ui/header";

import { useEffect, useState } from 'react';
import { saveStatus, searchStatuses } from './actions';

import Action from '@/app/ui/action';
import NoRecord from '@/app/ui/noRecord';
import Filters from '@/app/ui/filters';
import { convertFiltersToQuery } from '@/app/functions';
import Alert from '@/app/ui/alert';
import { stat } from 'fs';


interface PropsObject {

}

const Statuses: React.FC<PropsObject> = () => {

  const [response, setResponse] = useState()
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


  const cloneStatus = async (status: any) => {
    const response = await saveStatus(status);
    if (response?.status === 201 || response?.status === 200) {
      let message: any = `Status ${response?.status === 200 ? 'Updated' : response.message}`
      setResponse(message)
      fetchStatuses(filters)
    };
  }


  return (

    <>
      {statusModal && <Form
        statusForm={statusForm}
        setStatusForm={(newLead: any) => setStatusForm(newLead)}
        heading={modalHeading}
        closeModal={() => setStatusModal(false)}
        refreshStatuses={() => fetchStatuses(filters)}
        setResponse={(message: any) => setResponse(message)}
      />}

      {response && <Alert response={response} setResponse={(value: any) => setResponse(value)} />}

      <Header>
        <Button lable="New Status" icon={AddIcon} onClick={() => {
          setModalHeading('create status')
          setStatusModal(!statusModal)
          setStatusForm({});
        }} />
      </Header>

      <Filters filters={filters} setFilters={setFilters} count={statusesCount} />

      {statuses?.length ?
        <table className="w-full table-auto text-sm text-zinc-500">
          <tbody className='bg-zinc-100 text-zinc-600 font-semibold'>
            <tr>
              <td className='py-3 mb-3 px-4 rounded-tl-full rounded-bl-full'>counts</td>
              <td className='py-3 mb-3 px-4 '>notes</td>
              <td className='py-3 mb-3 px-4 text-center'>status</td>
              <td className='py-3 mb-3 px-4 rounded-tr-full rounded-br-full text-center'>action</td>
            </tr>
          </tbody>
          <tbody>
            {statuses.map((status: any, index: number) => (
              <tr key={index}>
                <td className='py-2 px-4 border-b border-dotted '>{status.companies.length + status.leads.length + status.activities.length}</td>
                <td className='py-2 px-4 border-b border-dotted'>{status.notes}</td>
                <td className='py-2 px-4 border-b border-dotted text-center'><Tag label={status.value} className={status.colour} /></td>
                <td className='py-2 px-4 border-b border-dotted flex gap-2 justify-center'>
                  <Action className="p-2" width={30} icon={CopyIcon} onClick={() => {
                    cloneStatus({ ...status, id: null })
                  }} />
                  <Action className="p-2" width={30} icon={EditIcon} onClick={() => {
                    setModalHeading('update status')
                    setStatusForm(status);
                    setStatusModal(true);
                  }} />
                </td>
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