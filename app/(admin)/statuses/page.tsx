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

      {statuses?.length ? statuses.map((company: any, index: number) => (
        <div key={index} className="grid grid-cols-7 gap-4 my-2 items-center bg-zinc-50 pl-1 pr-5 rounded-large">

          <div className="flex justify-end items-center gap-3 col-span-2 ">
            {company.url && <a href={company.url} target='_blank'> <Button lable="visit" className="hover:bg-zinc-200" icon={RightIcon} /> </a>}
            <Action className="p-2" height={40} width={36} icon={EditIcon} onClick={() => {
              setModalHeading('update company')
              setStatusForm(company);
              setStatusModal(true);
            }} />
          </div>


        </div>
      )) :
        <NoRecord label="statuses" />
      }


    </>
  )

}

export default Statuses;