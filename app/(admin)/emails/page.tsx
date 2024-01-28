'use client'

import Image from 'next/image';

import Tag from '@ui/tag';
import Button from "@ui/button";
import Heading from "@ui/heading";

import AddIcon from "@icons/add.svg";
import EditIcon from "@icons/edit.svg";
import RightIcon from "@icons/right.svg";

import defaultUser from '@icons/email.svg';

import Form from './form';
import Header from "@ui/header";

import { useEffect, useState } from 'react';
import { saveEmail, searchEmails } from './actions';

import Action from '@/app/ui/action';
import NoRecord from '@/app/ui/noRecord';
import Filters from '@/app/ui/filters';
import { convertFiltersToQuery } from '@/app/functions';
import Alert from '@/app/ui/alert';

import { defaultFilters } from '@/app/constants';
import { getStatuses } from '../statuses/actions';
import CopyIcon from "@icons/copy.svg";


interface PropsObject {

}

const Emails: React.FC<PropsObject> = () => {

  const [alert, setAlert] = useState()
  const [emailForm, setEmailForm] = useState({})
  const [modal, setModal] = useState(false);
  const [modalHeading, setModalHeading] = useState('');

  const [emails, setEmails] = useState([]);
  const [emailCounts, setEmailConts] = useState(0);
  const [statusOptions, setStatusOptions] = useState([]);

  const [filters, setFilters] = useState(defaultFilters)


  useEffect(() => {
    fetchEmails(filters)
  }, [])



  useEffect(() => {
    getStatuses().then(result => {
      if (result) setStatusOptions(result)
    });
  }, [])


  useEffect(() => {

    const delay = setTimeout(() => {
      fetchEmails(filters)
    }, 500)

    return () => clearTimeout(delay)

  }, [filters])

  const fetchEmails = (newFilters: any) => {

    searchEmails(convertFiltersToQuery(newFilters)).then(result => {
      if (result?.records) {
        setEmails(result.records)
        setEmailConts(result.total)
      }
    });

  }

  const cloneEmail = async (email: any) => {
    const response = await saveEmail(email);
    if (response?.status === 201 || response?.status === 200) {
      let message: any = `Email ${response?.status === 200 ? 'Updated' : response.message}`
      setAlert(message)
      fetchEmails(filters)
    };
  }


  return (

    <>
      {modal && <Form
        emailForm={emailForm}
        statusOptions={statusOptions}
        setEmailForm={(newEmail: any) => setEmailForm(newEmail)}
        heading={modalHeading}
        closeModal={() => setModal(false)}
        refreshEmails={() => fetchEmails(filters)}
        setAlert={(message: any) => setAlert(message)}
      />}

      {alert && <Alert response={alert} setResponse={(value: any) => setAlert(value)} />}

      <Header>
        <Button lable="New Email" icon={AddIcon} onClick={() => {
          setModalHeading('create email')
          setModal(!modal)
          setEmailForm({});
        }} />
      </Header>

      <Filters filters={filters} setFilters={setFilters} count={emailCounts} options={statusOptions} />

      {emails?.length ? (
        <table className="w-full table-auto text-sm text-zinc-500">
          <tbody className='bg-zinc-100 text-zinc-600 font-semibold'>
            <tr>
              <td className='py-3 mb-3 px-4 rounded-tl-full rounded-bl-full'>name</td>
              <td className='py-3 mb-3 px-4 '>subject</td>
              <td className='py-3 mb-3 px-4 text-center'>counts</td>
              <td className='py-3 mb-3 px-4 text-center'>status</td>
              <td className='py-3 mb-3 px-4 rounded-tr-full rounded-br-full text-center'>action</td>
            </tr>
          </tbody>
          <tbody>
            {emails.map((email: any, index: number) => (
              <tr key={index}>
                <td className='px-4 border-b border-dotted'>{email.name}</td>
                <td className='px-4 border-b border-dotted'>{email.subject}</td>
                <td className='px-4 border-b border-dotted'>{email.sentCount}</td>

                {/* statuses */}
                <td className='px-4 border-b border-dotted text-center'>
                  <div className="flex gap-1 items-center justify-center">
                    {email?.statuses?.length ? email.statuses.map((status: any, index: number) => <Tag key={index} label={status.value} className={`${status.colour}`} />) : <></>}
                  </div>
                </td>
                
                {/* actions */}
                <td className='px-4 h-10 border-b border-dotted '>
                  <div className='flex gap-2 justify-center items-center'>
                    <Action className="p-2" width={30} icon={CopyIcon} onClick={() => { cloneEmail({ ...email, id: null }) }} />
                    <Action className="p-2" width={30} icon={EditIcon} onClick={() => {
                      setModalHeading('update email')
                      setEmailForm(email);
                      setModal(true);
                    }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) :
        <NoRecord label="emails" />
      }


    </>
  )

}

export default Emails;