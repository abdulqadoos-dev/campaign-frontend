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
  data: any;
  functions: any;
}


const Form: React.FC<Props> = ({ data, functions }) => {

  const { alert, leadForm, leadModal, statusOptions } = data;
  const { setLeadForm, setLeadModal, setAlert, fetchLeads } = functions;

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

  const convertToData = (htmlContent: any) => {

    let parser = new DOMParser();
    let doc = parser.parseFromString(htmlContent, 'text/html');

    // Extracting first name, last name, and location
    let fullNameElement: any = doc.querySelector('.text-heading-xlarge');
    let fullName = fullNameElement ? fullNameElement.textContent.trim() : '';

    // Splitting the full name into first name and last name
    let [firstName, lastName] = fullName.split(' ');

    // let locationElement:any = doc.querySelector('.text-body-small');
    // let location = locationElement ? locationElement.textContent.trim() : '';

    let locationElement: any = doc.querySelector('.text-body-small.inline.break-words');
    let address = locationElement ? locationElement.textContent.trim() : '';

    let titleElement: any = doc.querySelector('.text-body-medium.break-words');
    let designation = titleElement ? titleElement.textContent.trim() : '';


    // Extracting profile image URL
    let imageUrlElement = doc.querySelector('.pv-top-card-profile-picture__image');
    let imageUrl = imageUrlElement ? imageUrlElement.getAttribute('src') : '';

    // Extracting the number of connections
    let connectionsElement: any = doc.querySelector('.t-bold');
    let connections = connectionsElement ? connectionsElement.textContent.trim() : '';


    let companyElement: any = doc.querySelector('.inline-show-more-text--is-collapsed-with-line-clamp.inline');
    let company = companyElement ? companyElement.textContent.trim() : '';


    setLeadForm({ ...leadForm, firstName, lastName, address, designation, imageUrl })

  }


  const handleSubmit = async () => {
    const response = await saveLead(leadForm);
    if (response?.status === 201 || response?.status === 200) {
      setAlert({...alert, message: `Lead ${response?.status === 200 ? 'Updated' : response.message}`, isMount: true})
      setLeadModal({ ...leadModal, isMount: false })
      fetchLeads();
    };
  }

  return (
    <Modal heading={leadModal.heading} closeModal={() => setLeadModal({ ...leadModal, isMount: false })} >

      <form action={handleSubmit}>

        <input type="hidden" name="id" value={leadForm?.id} />

        {!leadForm?.id ? (<Textarea name='html' label='html'
          onChange={(e: any) => convertToData(e.target.value)}
        />) : <></>}


        <Input type="text" label="email" name="email" value={leadForm?.email}
          onChange={(e: any) => setLeadForm({ ...leadForm, email: e.target.value })}
        />

        <Input type="url" label="link" name="url" value={leadForm?.url}
          onChange={(e: any) => setLeadForm({ ...leadForm, url: e.target.value })}
        />

        <Heading label="Auto generated" className="text-sm mx-2 my-5 " />

        <div className="flex gap-4 my-[-10px] ">
          <Input type="text" label="first Name" name="firstName" className="w-full" value={leadForm?.firstName}
            onChange={(e: any) => setLeadForm({ ...leadForm, firstName: e.target.value })}
          />
          <Input type="text" label="last Name" name="lastName" className="w-full" value={leadForm?.lastName}
            onChange={(e: any) => setLeadForm({ ...leadForm, lastName: e.target.value })}
          />
        </div>

        <Input type="url" label="image url" name="imageUrl" value={leadForm?.imageUrl}
          onChange={(e: any) => setLeadForm({ ...leadForm, imageUrl: e.target.value })}
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
          options={[{ id: null, label: "no company", value: "" }, ...companies]}
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

        <div className="flex justify-between">
          {/* <Button lable="delete" className="w-32 my-2" active="true" /> */}
          <Button lable="save" className="w-32 my-2" active="true" />
        </div>

      </form>
    </Modal>
  )
}

export default Form;