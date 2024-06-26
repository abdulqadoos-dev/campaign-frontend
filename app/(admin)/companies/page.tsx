'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';

import Tag from '@ui/tag';
import Button from "@ui/button";
import Heading from "@ui/heading";
import Header from "@ui/header";
import Action from '@ui/action';
import NoRecord from '@ui/noRecord';
import Filters from '@ui/filters';
import Alert from '@ui/alert';

import EamilIcon from "@icons/email.svg";
import AddIcon from "@icons/add.svg";
import EditIcon from "@icons/edit.svg";
import RightIcon from "@icons/right.svg";
import companyIcon from '@icons/company.svg';

import Form from './form';

import { convertFiltersToQuery } from '@/app/functions';
import { searchCompanies } from '@/app/(admin)/companies/actions';

import { defaultFilters } from '@/app/constants';
import { getStatuses } from '../statuses/actions';
import ComposeEmail from '@/app/ui/composeEmail';

import moment from 'moment';

interface PropsObject {

}

const initialAlert: any = { message: "", isMount: false }
const initialComposeEmailModal: any = { heading: "", isMount: false }

const Companies: React.FC<PropsObject> = () => {

  const [response, setReponse] = useState()
  const [alert, setAlert] = useState(initialAlert)
  const [companyForm, setCompanyForm] = useState({})
  const [companyModal, setCompanyModal] = useState(false);
  const [modalHeading, setModalHeading] = useState('');
  const [composeEmailModal, setComposeEmailModal] = useState(initialComposeEmailModal);


  const [companies, setCompanies] = useState([]);
  const [companiesCount, setCompaniesCount] = useState(0);

  const [filters, setFilters] = useState(defaultFilters)


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


  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    getStatuses().then(result => {
      if (result) setStatusOptions(result)
    });
  }, [])


  return (

    <>
      {companyModal && <Form
        companyForm={companyForm}
        setCompanyForm={(newLead: any) => setCompanyForm(newLead)}
        heading={modalHeading}
        statusOptions={statusOptions}
        closeModal={() => setCompanyModal(false)}
        refreshCompanies={() => fetchCompanies(filters)}
        setResponse={(message: any) => setReponse(message)}
      />}

      {response && <Alert response={response} setResponse={(value: any) => setReponse(value)} />}


      {composeEmailModal.isMount && <ComposeEmail
        data={{
          alert,
          companyForm,
          composeEmailModal,
        }}
        functions={{
          save: () => console.log('save'),
          setAlert: (newAlert: any) => setAlert(newAlert),
          setComposeEmailModal: (newComposeEmailModal: any) => setComposeEmailModal(newComposeEmailModal)
        }}
      />}

      <Header>
        <Button lable="New Company" icon={AddIcon} onClick={() => {
          setModalHeading('create company')
          setCompanyModal(!companyModal)
          setCompanyForm({});
        }} />
      </Header>

      <Filters filters={filters} setFilters={setFilters} count={companiesCount} options={statusOptions} />

      {companies?.length ? companies.map((company: any, index: number) => {

        return (<div key={index} className="grid grid-cols-8 gap-4 my-6 items-center bg-zinc-50  pl-1 pr-5 py-1 rounded-large relative">

          <div className="cursor-pointer col-span-2 ">
            <div className="flex gap-3 p-3 items-center">
              <Image src={company?.imageUrl ?? companyIcon} alt='user image' className={`rounded-full bg-zinc-100 ${company?.imageUrl ? "" : "p-3"}  `} width={50} height={50} />
              <div>
                <Heading label={`${company.name}`} className={"text-sm"} />
                <div className="text-xs text-zinc-500">{company?.email}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 col-span-2 overflow-clip ">
            <div className="text-xs text-zinc-800 font-bold">{company?.type} <br />  {company.address && <span className='text-zinc-400'>{company.address}</span>}  </div>
            <div className="text-xs text-lime-500">{company?.employees}</div>
          </div>

          <div className="flex justify-end gap-1 absolute w-full top-[-10px] px-5">
            {moment(company.createdAt).startOf('day').isSame(moment().startOf('day')) && <Tag key={0.1} label="today's" className="text-violet-500 bg-violet-100" />}

            {company.hiringFrom &&
              JSON.parse(company.hiringFrom).length ? JSON.parse(company.hiringFrom).map((hiringFrom: any) => <Tag key={index} label={hiringFrom.value} className="bg-zinc-200 text-zinc-600" />) : JSON.parse(company.hiringFrom)?.value}
            {company?.statuses?.length ? company.statuses.map((status: any, index: number) => <Tag key={index} label={status.value} className={status.colour} />) : <></>}
          </div>

          <div className="absolute bottom-[-5px] flex justify-center w-full text-[11px] ">
            <span className="text-zinc-500 bg-zinc-100 px-2 rounded-full">{moment(company.createdAt).format('ddd D MMM Y')} {company.leads.length ? ` | Leads Count ${company.leads.length}` : ""}</span>
          </div>

          <p className="text-xs py-4 col-span-2 text-zinc-600">{company.notes && company.notes.substr(0, 200)}</p>

          <div className="flex justify-end items-center gap-3 col-span-2  ">
            {company.url && <a href={company.url} target='_blank'> <Button lable="visit" className="hover:bg-zinc-200" icon={RightIcon} /> </a>}
            <Action className="p-[10px]" width={36} icon={EamilIcon} onClick={() => {
              setCompanyForm(company);
              setComposeEmailModal({ ...composeEmailModal, heading: "Emails", isMount: true });
            }} />
            <Action className="p-[10px]" height={40} width={36} icon={EditIcon} onClick={() => {
              setModalHeading('update company')
              setCompanyForm(company);
              setCompanyModal(true);
            }} />
          </div>

        </div>)
      }) :
        <NoRecord label="companies" />
      }


    </>
  )

}

export default Companies;