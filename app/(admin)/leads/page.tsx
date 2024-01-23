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
import { saveLead, searchLeads } from './actions';

import Action from '@/app/ui/action';
import NoRecord from '@/app/ui/noRecord';
import Filters from '@/app/ui/filters';
import { convertFiltersToQuery } from '@/app/functions';
import Alert from '@/app/ui/alert';

import { LEADS, defaultFilters } from '@/app/constants';
import { getStatusesByType } from '../statuses/actions';
import CopyIcon from "@icons/copy.svg";


interface PropsObject {

}

const Leads: React.FC<PropsObject> = () => {

  const [response, setResponse] = useState()
  const [leadForm, setLeadForm] = useState({})
  const [leadModal, setLeadModal] = useState(false);
  const [modalHeading, setModalHeading] = useState('');

  const [leads, setLeads] = useState([]);
  const [leadsCount, setLeadsCount] = useState(0);

  const [filters, setFilters] = useState(defaultFilters)


  useEffect(() => {
    fetchLeads(filters)
  }, [])


  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    getStatusesByType(LEADS).then(result => {
      if (result) setStatusOptions(result)
    });
  }, [])

  useEffect(() => {

    const delay = setTimeout(() => {
      fetchLeads(filters)
    }, 500)

    return () => clearTimeout(delay)

  }, [filters])

  const fetchLeads = (newFilters: any) => {

    searchLeads(convertFiltersToQuery(newFilters)).then(result => {
      if (result?.records) {
        setLeads(result.records)
        setLeadsCount(result.total)
      }
    });

  }

  const cloneLead = async (lead: any) => {
    const response = await saveLead(lead);
    if (response?.status === 201 || response?.status === 200) {
      let message: any = `Lead ${response?.status === 200 ? 'Updated' : response.message}`
      setResponse(message)
      fetchLeads(filters)
    };
  }


  return (

    <>
      {leadModal && <Form
        leadForm={leadForm}
        statusOptions={statusOptions}
        setLeadForm={(newLead: any) => setLeadForm(newLead)}
        heading={modalHeading}
        closeModal={() => setLeadModal(false)}
        refreshLeads={() => fetchLeads(filters)}
        setResponse={(message: any) => setResponse(message)}
      />}

      {response && <Alert response={response} setResponse={(value: any) => setResponse(value)} />}

      <Header>
        <Button lable="New Lead" icon={AddIcon} onClick={() => {
          setModalHeading('create lead')
          setLeadModal(!leadModal)
          setLeadForm({});
        }} />
      </Header>

      <Filters filters={filters} setFilters={setFilters} count={leadsCount} options={statusOptions} />

      {leads?.length ? leads.map((lead: any, index: number) => (
        <div key={index} className="grid grid-cols-9 gap-4 my-2 items-center bg-zinc-50 pl-1 pr-5 rounded-large">

          <div className="cursor-pointer col-span-3">
            <div className="flex gap-3 p-3 items-center">
              <Image src={defaultUser} alt='user image' className="rounded-full bg-zinc-100 p-3" width={50} height={50} />
              <div>
                <Heading label={`${lead.firstName} ${lead.lastName}`} className={"text-sm"} />
                <div className="text-xs text-zinc-500">{lead?.email}</div>
              </div>
            </div>
          </div>


          <div className="flex flex-col gap-1 col-span-3 overflow-clip">
            <div className="text-xs text-zinc-700 font-bold">{lead?.designation} {lead?.company && <span> at {lead.company.name}</span>}   </div>
            <div className="text-xs text-lime-500">{lead?.address}</div>
            {lead.notes && <p className="text-xs text-zinc-500">{lead.notes.substr(0, 40)}</p>}
          </div>


          <div className="grid gap-1 items-center my-1">
            {lead?.statuses?.length ? lead.statuses.map((status: any) => <Tag label={status.value} className={status.style} />) : <></>}
          </div>

          <div className="flex justify-end items-center gap-2 col-span-2 ">
            {lead.url && <a href={lead.url} target='_blank'> <Button lable="visit" className="hover:bg-zinc-200" icon={RightIcon} /> </a>}
            <Action className="p-2" width={36} icon={CopyIcon} onClick={() => { cloneLead({ ...lead, id: null }) }} />
            <Action className="p-2" width={36} icon={EditIcon} onClick={() => {
              setModalHeading('update lead')
              setLeadForm(lead);
              setLeadModal(true);
            }} />
          </div>


        </div>
      )) :
        <NoRecord label="leads" />
      }


    </>
  )

}

export default Leads;