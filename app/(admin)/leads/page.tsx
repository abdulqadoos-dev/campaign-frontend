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

import Form from './form';

import Header from "@ui/header";

import { useEffect, useState } from 'react';
import { getLeads } from './actions';
import { tree } from 'next/dist/build/templates/app-page';

interface PropsObject {

}

const Leads: React.FC<PropsObject> = () => {

  const [leadModal, setLeadModal] = useState(false);
  const [leads, setLeads] = useState([]);
  const [leadForm, setLeadForm] = useState({})
  const [modalHeading, setModalHeading] = useState('')

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = () => {
    getLeads().then(result => {
      result.length && setLeads(result)
    });
  }

  return (
    <>
      <Header>
        <Button lable="New Lead" icon={AddIcon} onClick={() => {
          setModalHeading('create lead')
          setLeadModal(!leadModal)
          setLeadForm({});
        }} />
      </Header>

      <section className="filters">

      </section>

      {leadModal && <Form
        leadForm={leadForm}
        setLeadForm={(newLead: any) => setLeadForm(newLead)}
        heading={modalHeading}
        closeModal={() => setLeadModal(false)}
        refreshLeads={() => fetchLeads()}
      />}

      {leads.length ? leads.map((lead: any, index) => (
        <div key={index} className="grid grid-cols-7 gap-4 my-2 items-center bg-zinc-50 pl-1 pr-5 rounded-large">

          <div className="cursor-pointer col-span-2">
            <div className="flex gap-3 p-3 items-center">
              <Image src={UserImage} alt='user image' className="rounded-full" width={50} height={50} />
              <div>
                <Heading label={`${lead.firstName} ${lead.lastName}`} className={"text-sm"} />
                <span className="text-xs text-zinc-400">{lead?.designation}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 col-span-2 overflow-clip">
            <p className="text-sm " >{lead.email}</p>
            <p className="text-xs text-zinc-400">{lead.notes.substr(0, 40)}</p>
            {/* <Link href={"/"} className="text-xs text-zinc-400">{('https://www.linkedin.com/company/inzonedubai/').substr(0, 40)}..</Link> */}
          </div>


          <div className="flex justify-center ">
            <Tag label={lead.status} className="w-fit" />
          </div>


          <div className="flex justify-end items-center gap-3 col-span-2 ">
            <Button lable="visit" icon={RightIcon} />
            <Button lable="Edit" icon={EditIcon} onClick={() => {
              setModalHeading('update lead')
              setLeadForm(lead);
              setLeadModal(true);
            }} />
          </div>


        </div>
      )) : "no leads"}


    </>
  )

}

export default Leads;