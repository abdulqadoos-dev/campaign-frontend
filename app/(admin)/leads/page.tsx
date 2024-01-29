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

import { useCallback, useEffect, useState } from 'react';
import { saveLead, searchLeads } from './actions';

import Action from '@/app/ui/action';
import NoRecord from '@/app/ui/noRecord';
import Filters from '@/app/ui/filters';
import { convertFiltersToQuery } from '@/app/functions';
import Alert from '@/app/ui/alert';

import { defaultFilters } from '@/app/constants';
import { getStatuses } from '../statuses/actions';
import CopyIcon from "@icons/copy.svg";
import EamilIcon from "@icons/email.svg";

import moment from 'moment';
import ComposeEmail from '@/app/ui/composeEmail';

interface PropsObject {

}

const initialLeadForm: any = {}
const initialAlert: any = { message: "", isMount: false }
const initialLeadModal: any = { heading: "", isMount: false }
const initialComposeEmailModal: any = { heading: "", isMount: false }

const Leads: React.FC<PropsObject> = () => {


  const [alert, setAlert] = useState(initialAlert)
  const [leadForm, setLeadForm] = useState(initialLeadForm)
  const [leadModal, setLeadModal] = useState(initialLeadModal);
  const [composeEmailModal, setComposeEmailModal] = useState(initialComposeEmailModal);

  const [leads, setLeads] = useState([]);
  const [leadsCount, setLeadsCount] = useState(0);
  const [filters, setFilters] = useState(defaultFilters)

  const fetchLeads = (newFilters: any) => {

    searchLeads(convertFiltersToQuery(newFilters)).then(result => {
      if (result?.records) {
        setLeads(result.records)
        setLeadsCount(result.total)
      }
    });

  }


  useEffect(() => {
    fetchLeads(filters)
  }, [])


  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    getStatuses().then(result => {
      if (result) setStatusOptions(result)
    });
  }, [])


  useEffect(() => {

    const delay = setTimeout(() => {
      fetchLeads(filters)
    }, 500)
    return () => clearTimeout(delay)

  }, [filters])






  const cloneLead = async (lead: any) => {
    const response = await saveLead(lead);
    if (response?.status === 201 || response?.status === 200) {
      setAlert({ ...alert, message: `Lead ${response?.status === 200 ? 'Updated' : response.message}`, isMount: true })
      fetchLeads(filters)
    };
  }


  return (

    <>
      {leadModal.isMount && <Form
        data={{
          alert,
          leadForm,
          leadModal,
          statusOptions
        }}
        functions={{
          fetchLeads: () => fetchLeads(filters),
          setAlert: (newAlert: any) => setAlert(newAlert),
          setLeadForm: (newLeadForm: any) => setLeadForm(newLeadForm),
          setLeadModal: (newLeadModal: any) => setLeadModal(newLeadModal),
        }}
      />}

      {composeEmailModal.isMount && <ComposeEmail
        data={{
          alert,
          leadForm,
          composeEmailModal,
        }}
        functions={{
          save: () => console.log('save'),
          setAlert: (newAlert: any) => setAlert(newAlert),
          setComposeEmailModal: (newComposeEmailModal: any) => setComposeEmailModal(newComposeEmailModal)
        }}
      />}

      {alert.isMount && <Alert response={alert.message} setResponse={(value: any) => setAlert({ ...alert, isMount: value })} />}

      <Header>
        <Button lable="New Lead" icon={AddIcon} onClick={() => {
          setLeadModal({ ...leadModal, heading: "Create Lead", isMount: true })
          setLeadForm(initialLeadForm);
        }} />
      </Header>

      <Filters filters={filters} setFilters={setFilters} count={leadsCount} options={statusOptions} />

      {leads?.length ? leads.map((lead: any, index: number) => (
        <div key={index} className="grid grid-cols-10 gap-4 my-6 items-center bg-zinc-50 pl-1 pr-5 py-1 rounded-large relative">

          <div className="cursor-pointer col-span-3">
            <div className="flex gap-3 p-3 items-center">
              <Image src={lead?.imageUrl ?? defaultUser} alt='user image' className={`rounded-full bg-zinc-100 ${lead?.imageUrl ? "" : "p-3"}  `} width={50} height={50} />
              <div>
                <Heading label={`${lead.firstName} ${lead.lastName}`} className={"text-sm"} />
                <div className="text-xs text-zinc-500">{lead?.email}</div>
              </div>
            </div>
          </div>


          <div className="flex flex-col gap-1 col-span-3 overflow-clip">
            <div className="text-xs text-zinc-700 font-bold">{lead?.designation}  {lead?.company && <span className='text-lime-500'> at {lead.company.name}</span>}   </div>
            <div className="text-xs text-zinc-400 font-bold">{lead?.address}</div>
          </div>

          <div className="flex justify-end gap-1 absolute w-full top-[-10px] px-5">
            {moment(lead.createdAt).startOf('day').isSame(moment().startOf('day')) && <Tag label="today's" className="text-violet-500 bg-violet-100" />}
            {lead?.statuses?.length ? lead.statuses.map((status: any, index: number) => <Tag key={index} label={status.value} className={status.colour} />) : <></>}
          </div>

          <div className="absolute bottom-[-5px] flex justify-center w-full text-xs ">
            <span className="text-zinc-500 bg-zinc-100 px-2 rounded-full">{moment(lead.createdAt).format("ddd D MMM Y h:mm A")}</span>
          </div>

          <p className="text-xs py-4 col-span-2 text-zinc-600">{lead.notes && lead.notes.substr(0, 200)}</p>

          <div className="flex justify-end items-center gap-1 col-span-2 ">
            {lead.url && <a href={lead.url} target='_blank'>  <Action className="p-[10px]" width={36} icon={RightIcon}/> </a>}
            <Action className="p-[10px]" width={36} icon={EamilIcon} onClick={() => {
              setLeadForm(lead);
              setComposeEmailModal({ ...composeEmailModal, heading: "compose email", isMount: true });
            }} />
            {/* <Action className="p-[10px]" width={36} icon={CopyIcon} onClick={() => { cloneLead({ ...lead, id: null }) }} /> */}
            <Action className="p-[10px]" width={36} icon={EditIcon} onClick={() => {
              setLeadForm(lead);
              setLeadModal({ ...leadModal, heading: "Update Lead", isMount: true });
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