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
import { searchActivities } from './actions';

import Action from '@/app/ui/action';
import NoRecord from '@/app/ui/noRecord';
import Filters from '@/app/ui/filters';
import { convertFiltersToQuery } from '@/app/functions';
import Alert from '@/app/ui/alert';
import { statusTypeOptions } from '@/app/constants';

interface PropsObject {

}

const Activities: React.FC<PropsObject> = () => {

  const [response, setReponse] = useState()
  const [activityForm, setActivityForm] = useState({})
  const [modal, setModal] = useState(false);
  const [modalHeading, setModalHeading] = useState('');

  const [activities, setActivities] = useState([]);
  const [activitiesCount, setActivitiesCount] = useState(0);

  const [filters, setFilters] = useState({ query: "", status: "", skip: 0, take: 20 })


  useEffect(() => {
    fetchActivites(filters)
  }, [])

  useEffect(() => {

    const delay = setTimeout(() => {
      fetchActivites(filters)
    }, 500)

    return () => clearTimeout(delay)

  }, [filters])

  const fetchActivites = (newFilters: any) => {

    searchActivities(convertFiltersToQuery(newFilters)).then(result => {
      if (result?.records) {
        setActivities(result.records)
        setActivitiesCount(result.total)
      }
    });

  }


  return (

    <>
      {modal && <Form
        activityForm={activityForm}
        setActivityForm={(newLead: any) => setActivityForm(newLead)}
        heading={modalHeading}
        closeModal={() => setModal(false)}
        refreshActivities={() => fetchActivites(filters)}
        setResponse={(message: any) => setReponse(message)}
      />}

      {response && <Alert response={response} setResponse={(value: any) => setReponse(value)} />}

      <Header>
        <Button lable="New Activity" icon={AddIcon} onClick={() => {
          setModalHeading('create activity')
          setModal(!modal)
          setActivityForm({});
        }} />
      </Header>

      <Filters filters={filters} setFilters={setFilters} count={activitiesCount} />

      {activities?.length ?
        <table className="w-full table-auto text-sm text-zinc-500">
          <tbody className='bg-zinc-100 text-zinc-600 font-semibold'>
            <tr>
              <td className='py-3 mb-3 px-4 rounded-tl-full rounded-bl-full'>name</td>
              <td className='py-3 mb-3 px-4'>Notes</td>
              <td className='py-3 mb-3 px-4 text-center'>status</td>
              <td className='py-3 mb-3 px-4 rounded-tr-full rounded-br-full text-end'>action</td>
            </tr>
          </tbody>
          <tbody>
            {activities.map((activity: any, index: number) => (
              <tr key={index}>
                <td className='py-2 px-4 border-b border-dotted'>{activity.name}</td>
                <td className='py-2 px-4 border-b border-dotted'>{activity.notes}</td>
                <td className='py-2 px-4 border-b border-dotted text-center'><Tag label={activity.status.value} className={activity.status.style} /></td>
                <td className='py-2 px-4 border-b border-dotted text-right'> <Action className="p-2" width={30} icon={EditIcon} onClick={() => {
                  setModalHeading('update activity')
                  setActivityForm(activity);
                  setModal(true);
                }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        :
        <NoRecord label="activities" />
      }
    </>
  )

}

export default Activities;