'use client'

import Image from 'next/image';

import Tag from '@ui/tag';
import Button from "@ui/button";
import Heading from "@ui/heading";

import AddIcon from "@icons/add.svg";
import EditIcon from "@icons/edit.svg";
import RightIcon from "@icons/right.svg";

import companyIcon from '@icons/company.svg';

import Form from './form';
import Header from "@ui/header";

import { useEffect, useState } from 'react';
import { searchCompanies } from './actions';

import Action from '@/app/ui/action';
import NoRecord from '@/app/ui/noRecord';
import Filters from '@/app/ui/filters';
import { convertFiltersToQuery } from '@/app/functions';
import Alert from '@/app/ui/alert';
import { statusOptions } from '@/app/constants';

interface PropsObject {

}

const Companies: React.FC<PropsObject> = () => {

  const [response, setReponse] = useState()
  const [companyForm, setCompanyForm] = useState({})
  const [companyModal, setCompanyModal] = useState(false);
  const [modalHeading, setModalHeading] = useState('');

  const [companies, setCompanies] = useState([]);
  const [companiesCount, setCompaniesCount] = useState(0);

  const [filters, setFilters] = useState({ query: "", status: "", skip: 0, take: 20 })


  useEffect(() => {
    fetchCompanies(filters)
  }, [])

  useEffect(() => {

    const delay = setTimeout(() => {
      fetchCompanies(filters)
    }, 500)

    return () => clearTimeout(delay)

  }, [filters])

  const fetchCompanies = (newFilters: any) => {

    searchCompanies(convertFiltersToQuery(newFilters)).then(result => {
      if (result?.records) {
        setCompanies(result.records)
        setCompaniesCount(result.total)
      }
    });

  }


  return (

    <>
      {companyModal && <Form
        companyForm={companyForm}
        setCompanyForm={(newLead: any) => setCompanyForm(newLead)}
        heading={modalHeading}
        closeModal={() => setCompanyModal(false)}
        refreshCompanies={() => fetchCompanies(filters)}
        setResponse={(message: any) => setReponse(message)}
      />}

      {response && <Alert response={response} setResponse={(value: any) => setReponse(value)} />}

      <Header>
        <Button lable="New Company" icon={AddIcon} onClick={() => {
          setModalHeading('create company')
          setCompanyModal(!companyModal)
          setCompanyForm({});
        }} />
      </Header>

      <Filters filters={filters} setFilters={setFilters} count={companiesCount} options={statusOptions} />

      {companies?.length ? companies.map((company: any, index: number) => (
        <div key={index} className="grid grid-cols-7 gap-4 my-2 items-center bg-zinc-50 pl-1 pr-5 rounded-large">

          <div className="cursor-pointer col-span-2">
            <div className="flex gap-3 p-3 items-center">
              <Image src={companyIcon} alt='user image' className="rounded-full bg-zinc-100 p-3" width={50} height={50} />
              <div>
                <Heading label={`${company.name}`} className={"text-sm"} />
                <span className="text-xs text-zinc-400">{company?.employees}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 col-span-2 overflow-clip">
            <p className="text-sm " >{company.email}</p>
            <p className="text-xs text-zinc-400">{company.notes.substr(0, 40)}</p>
          </div>

          <div className="flex justify-center ">
            {company.status && <Tag label={company.status} className="w-fit" />}
          </div>

          <div className="flex justify-end items-center gap-3 col-span-2 ">
            {company.url && <a href={company.url} target='_blank'> <Button lable="visit" className="hover:bg-zinc-200" icon={RightIcon} /> </a>}
            <Action className="p-2" height={40} width={36} icon={EditIcon} onClick={() => {
              setModalHeading('update company')
              setCompanyForm(company);
              setCompanyModal(true);
            }} />
          </div>


        </div>
      )) :
        <NoRecord label="companies" />
      }


    </>
  )

}

export default Companies;