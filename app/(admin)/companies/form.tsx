'use client'


import Modal from "@ui/modal";
import Input from "@ui/input";
import Button from "@ui/button";

import { saveCompany } from "./actions";

import Textarea from '@/app/ui/textarea';
import ReactSelect from "@/app/ui/reactSelect";
import ReactMultiSelect from "@/app/ui/reactMultiSelect";
import { hirringOptions } from "@/app/constants";

interface Props {

  heading: string;
  closeModal: any;
  refreshCompanies: any;
  setCompanyForm: any;
  setResponse?: any;
  statusOptions?: any
  companyForm?: {
    id?: number,
    name?: string,
    phone?: string,
    email?: string,
    url?: string,
    statuses?: any,
    notes?: string,
    type?: string,
    address?: string,
    hiringFrom?: string,
    employees?: string,
    imageUrl?:string

  }
}



const Form: React.FC<Props> = ({ heading, companyForm, setCompanyForm, closeModal, refreshCompanies, setResponse, statusOptions }) => {


  const handleSubmit = async () => {
    const response = await saveCompany(companyForm);
    if (response?.status === 201 || response?.status === 200) {
      setResponse(`Company ${response?.status === 200 ? 'Updated' : response.message}`)
      closeModal();
      refreshCompanies();
    };
  }


  const convertToData = (htmlContent: any) => {

    let parser = new DOMParser();
    let doc = parser.parseFromString(htmlContent, 'text/html');

    // Extracting information
    let nameElement: any = doc.querySelector('.org-top-card-summary__title');
    let name = nameElement ? nameElement.textContent.trim() : '';

    let taglineElement: any = doc.querySelector('.org-top-card-summary__tagline');
    let tagline = taglineElement ? taglineElement.textContent.trim() : '';

    let typeElement: any = doc.querySelector('.org-top-card-summary-info-list__info-item');
    let type = typeElement ? typeElement.textContent.trim() : '';

    let locationElement: any = doc.querySelector('.org-top-card-summary-info-list .inline-block .org-top-card-summary-info-list__info-item');
    let address = locationElement ? locationElement.textContent.trim() : '';

    let followersElement: any = doc.querySelector('.org-top-card-summary-info-list__info-item:nth-child(2)');
    let followers = followersElement ? followersElement.textContent.trim() : '';

    let employeesElement: any = doc.querySelector('.org-top-card-summary-info-list__info-item:nth-child(3)');
    let employees = employeesElement ? employeesElement.textContent.trim() : '';

    let logoElement: any = doc.querySelector('.org-top-card-primary-content__logo-container');
    let imageUrl = logoElement ? logoElement?.querySelector('img')?.getAttribute('src') : '';

    // Displaying the extracted information
    console.log('Name:', name);
    console.log('Followers:', followers);
    console.log('Employees:', employees);


    setCompanyForm({ ...companyForm, name, address, imageUrl, type, employees: `${followers} ${employees}` })

  }


  return (
    <Modal heading={heading} closeModal={closeModal} >


      <form action={handleSubmit}>

        <input type="hidden" name="id" value={companyForm?.id} />


        {!companyForm?.id ? (<Textarea name='html' label='html'
          onChange={(e: any) => convertToData(e.target.value)}
        />) : <></>}


        <Input type="text" label="Name" name="name" value={companyForm?.name}
          onChange={(e: any) => setCompanyForm({ ...companyForm, name: e.target.value })}
        />
        <Input type="text" label="company type" name="type" value={companyForm?.type}
          onChange={(e: any) => setCompanyForm({ ...companyForm, type: e.target.value })}
        />
        <Input type="text" label="no of employees" name="employees" value={companyForm?.employees}
          onChange={(e: any) => setCompanyForm({ ...companyForm, employees: e.target.value })}
        />
        <Input type="text" label="email" name="email" value={companyForm?.email}
          onChange={(e: any) => setCompanyForm({ ...companyForm, email: e.target.value })}
        />
        <Input type="url" label="url" name="url" value={companyForm?.url}
          onChange={(e: any) => setCompanyForm({ ...companyForm, url: e.target.value })}
        />

        <Input type="url" label="image url" name="imageUrl" value={companyForm?.imageUrl}
          onChange={(e: any) => setCompanyForm({ ...companyForm, imageUrl: e.target.value })}
        />

        <Input type="text" label="address" name="address" value={companyForm?.address}
          onChange={(e: any) => setCompanyForm({ ...companyForm, address: e.target.value })}
        />

        <ReactMultiSelect
          label="hirring from"
          onChange={(value: any) => setCompanyForm({ ...companyForm, hiringFrom: JSON.stringify(value) })}
          defaultValues={companyForm?.hiringFrom && JSON.parse(companyForm.hiringFrom)}
          options={hirringOptions}
        />


        <ReactMultiSelect
          label="statuses"
          onChange={(value: any) => setCompanyForm({ ...companyForm, statuses: value })}
          defaultValues={companyForm?.statuses}
          options={statusOptions}
        />


        <Textarea name='notes' label='notes' value={companyForm?.notes}
          onChange={(e: any) => setCompanyForm({ ...companyForm, notes: e.target.value })}
        />
        <div className="grid justify-items-stretch">
          <Button lable="save" className="w-32 my-2 justify-self-end" active="true" />
        </div>
      </form>
    </Modal>
  )
}

export default Form;