'use client'

import Image from 'next/image';
import Link from 'next/link';

import Tag from '@ui/tag';
import Button from "@ui/button";
import Heading from "@ui/heading";

import AddIcon from "@icons/add.svg";
import EditIcon from "@icons/edit.svg";
import RightIcon from "@icons/right.svg";
import UserImage from '@images/person.jpeg';
import defaultUser from '@icons/leads.svg';

import Form from './form';
import Header from "@ui/header";

import { useEffect, useState } from 'react';
import { searchLeads } from './actions';
import Input from '@/app/ui/input';
import Select from '@/app/ui/select';
import { statusOptions } from '@/app/constants';
import Action from '@/app/ui/action';

import leftIcon from '@icons/chevron-left.svg';
import rightIcon from '@icons/chevron-right.svg';
import NoRecord from '@/app/ui/noRecord';

interface PropsObject {

}

const Leads: React.FC<PropsObject> = () => {

  const [leadForm, setLeadForm] = useState({})
  const [leadModal, setLeadModal] = useState(false);
  const [modalHeading, setModalHeading] = useState('');

  const [leads, setLeads] = useState([]);
  const [leadsCount, setLeadsCount] = useState(0);
 
  const [filters, setFilters] = useState({ query: "", status: "", skip: 0, take: 20 })


  const convertFiltersToQuery = (newFilters: any) => {

    const defaultFilters = {
      order: {
        id: "DESC"
      },
      skip: newFilters.skip,
      take: newFilters.take
    }

    if (newFilters.query && newFilters.status) {
      return {
        ...defaultFilters,
        query: newFilters.query,
        status: newFilters.status,
      }
    }

    if (newFilters.query) {
      return {
        ...defaultFilters,
        query: newFilters.query,
      }
    }

    if (newFilters.status) {
      return {
        ...defaultFilters,
        where: { status: newFilters.status },
      }
    }

    return defaultFilters;

  }

  useEffect(() => {
    fetchLeads(filters)
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


  return (

    <>
      {leadModal && <Form
        leadForm={leadForm}
        setLeadForm={(newLead: any) => setLeadForm(newLead)}
        heading={modalHeading}
        closeModal={() => setLeadModal(false)}
        refreshLeads={() => fetchLeads(filters)}
      />}


      <Header>
        <Button lable="New Lead" icon={AddIcon} onClick={() => {
          setModalHeading('create lead')
          setLeadModal(!leadModal)
          setLeadForm({});
        }} />
      </Header>

      <section className="flex items-center justify-between">

        <div className="flex items-center gap-3">
          <span>Filters:</span>

          <Input name='search' type='serach' value={filters.query} placeholder='search..'
            onChange={(e: any) => {
              let newFilters = { ...filters, query: e.target.value, skip: 0 }
              setFilters(newFilters)
            }}
          />

          <Select palceholder="All" name='status' className="w-36" selected={filters.status} options={statusOptions}
            onChange={(e: any) => {
              let newFilters = { ...filters, status: e.target.value, skip: 0 }
              setFilters(newFilters)
            }}
          />
        </div>

        <div className="flex items-center text-sm text-zinc-400 gap-2">

          {filters.skip > 0 ? <Action icon={leftIcon} onClick={() => {
            let newFilters = { ...filters, skip: filters.skip - 20 }
            setFilters(newFilters)
          }} /> : <Action icon={leftIcon} />}

          <span>{`${(filters.take + filters.skip) < leadsCount ? filters.skip + " - " : ""} ${(filters.take + filters.skip) < leadsCount ? (filters.take + filters.skip) : leadsCount} of ${leadsCount}`}</span>

          {(filters.take + filters.skip) < leadsCount ? <Action icon={rightIcon} onClick={() => {
            let newFilters = { ...filters, skip: filters.skip + 20 }
            setFilters(newFilters)
          }} /> : <Action icon={rightIcon} />}

        </div>

      </section>


      {leads?.length ? leads.map((lead: any, index: number) => (
        <div key={index} className="grid grid-cols-7 gap-4 my-2 items-center bg-zinc-50 pl-1 pr-5 rounded-large">

          <div className="cursor-pointer col-span-2">
            <div className="flex gap-3 p-3 items-center">
              <Image src={defaultUser} alt='user image' className="rounded-full bg-zinc-100 p-3" width={50} height={50} />
              <div>
                <Heading label={`${lead.firstName} ${lead.lastName}`} className={"text-sm"} />
                <span className="text-xs text-zinc-400">{lead?.designation}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 col-span-2 overflow-clip">
            <p className="text-sm " >{lead.email}</p>
            <p className="text-xs text-zinc-400">{lead.notes.substr(0, 40)}</p>
          </div>

          <div className="flex justify-center ">
            {lead.status && <Tag label={lead.status} className="w-fit" />}
          </div>

          <div className="flex justify-end items-center gap-3 col-span-2 ">
            {lead.url && <a href={lead.url} target='_blank'> <Button lable="visit" className="hover:bg-zinc-200" icon={RightIcon} /> </a>}
            <Action className="p-2" height={40} width={36} icon={EditIcon} onClick={() => {
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