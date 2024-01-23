'use client'

import Modal from "@ui/modal";
import Input from "@ui/input";
import Button from "@ui/button";

import ReactSelect from "@/app/ui/reactSelect";
import ReactMultiSelect from "@/app/ui/reactMultiSelect";

import { saveLead } from "./actions";
import Textarea from '@/app/ui/textarea';
import Heading from "@/app/ui/heading";
import { useEffect, useState } from "react";

import { convertFiltersToQuery } from '@/app/functions';
import { defaultFilters } from '@/app/constants';
import { searchCompanies } from '@/app/(admin)/companies/actions';


interface Props {

  heading: string;
  closeModal: any;
  refreshLeads: any;
  setLeadForm: any;
  setResponse?: any;
  statusOptions?: any;
  leadForm?: {
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    url?: string,
    statuses?: string,
    notes?: string,
    address?: string,
    designation?: string,
    company?: any,
  }
}


const Form: React.FC<Props> = ({ heading, leadForm, setLeadForm, closeModal, refreshLeads, setResponse, statusOptions }) => {


  //  todo: companies send to a SelectCompanies component
  const [companies, setCompanies] = useState([]);
  const [filters, setFilters] = useState(defaultFilters)

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchCompanies(filters)
    }, 500)
    return () => clearTimeout(delay)
  }, [filters])

  const fetchCompanies = (newFilters: any) => {
    searchCompanies(convertFiltersToQuery(newFilters)).then(result => {
      if (result?.records) {
        let options: any = [...result.records.map((company: any) => ({ id: company.id, label: company.name, value: company.name }))]
        setCompanies(options)
      }
    });
  }


  const handleSubmit = async () => {
    const response = await saveLead(leadForm);
    if (response?.status === 201 || response?.status === 200) {
      setResponse(`Lead ${response?.status === 200 ? 'Updated' : response.message}`)
      closeModal();
      refreshLeads();
    };
  }

  return (
    <Modal heading={heading} closeModal={closeModal} >

      <form action={handleSubmit}>

        <input type="hidden" name="id" value={leadForm?.id} />

        <div className="flex gap-4 my-[-10px]">
          <Input type="text" label="first Name" name="firstName" value={leadForm?.firstName}
            onChange={(e: any) => setLeadForm({ ...leadForm, firstName: e.target.value })}
          />
          <Input type="text" label="last Name" name="lastName" value={leadForm?.lastName}
            onChange={(e: any) => setLeadForm({ ...leadForm, lastName: e.target.value })}
          />
        </div>

        <Input type="text" label="email" name="email" value={leadForm?.email}
          onChange={(e: any) => setLeadForm({ ...leadForm, email: e.target.value })}
        />
        <Input type="url" label="profile link" name="url" value={leadForm?.url}
          onChange={(e: any) => setLeadForm({ ...leadForm, url: e.target.value })}
        />

        <Heading label="Company" className="text-sm mx-2 my-5 " />

        <Input type="text" label="designation" name="designation" value={leadForm?.designation}
          onChange={(e: any) => setLeadForm({ ...leadForm, designation: e.target.value })}
        />

        <ReactSelect
          label="company"
          onInputChange={(value: any) => setFilters({ ...filters, query: value })}
          onChange={(value: any) => setLeadForm({ ...leadForm, company: value })}
          defaultValue={leadForm?.company && { id: leadForm.company.id, label: leadForm.company.name, value: leadForm.company.name }}
          options={companies}
        />

        <Input type="text" label="address" name="address" value={leadForm?.address}
          onChange={(e: any) => setLeadForm({ ...leadForm, address: e.target.value })}
        />

        <Heading label="additional" className="text-sm mx-2 my-5 " />

        <ReactMultiSelect
          label="statuses"
          onChange={(value: any) => setLeadForm({ ...leadForm, statuses: value })}
          defaultValues={leadForm?.statuses}
          options={statusOptions}
        />

        <Textarea name='notes' label='notes' value={leadForm?.notes}
          onChange={(e: any) => setLeadForm({ ...leadForm, notes: e.target.value })}
        />
        <div className="grid justify-items-stretch">
          <Button lable="save" className="w-32 my-2 justify-self-end" active="true" />
        </div>

      </form>
    </Modal>
  )
}

export default Form;