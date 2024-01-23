'use client'

import Image from 'next/image';

import Tag from '@ui/tag';
import Button from "@ui/button";

import AddIcon from "@icons/add.svg";
import EditIcon from "@icons/edit.svg";
import CopyIcon from "@icons/copy.svg";

import Form from './form';
import Header from "@ui/header";

import { useEffect, useState } from 'react';
import { saveActivity, searchActivities } from './actions';

import Action from '@/app/ui/action';
import NoRecord from '@/app/ui/noRecord';
import Filters from '@/app/ui/filters';
import { convertFiltersToQuery } from '@/app/functions';
import Alert from '@/app/ui/alert';
import { ACTIVITIES, defaultFilters } from '@/app/constants';

import { getStatusesByType } from '../statuses/actions';


interface PropsObject {

}

const Activities: React.FC<PropsObject> = () => {

  const [response, setResponse] = useState()
  const [activityForm, setActivityForm] = useState({})
  const [modal, setModal] = useState(false);
  const [modalHeading, setModalHeading] = useState('');

  const [activities, setActivities] = useState([]);
  const [activitiesCount, setActivitiesCount] = useState(0);

  const [filters, setFilters] = useState(defaultFilters)


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

  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    getStatusesByType(ACTIVITIES).then(result => {
      if (result) setStatusOptions(result)
    });
  }, [])


  const cloneActivity = async (activity: any) => {
    const response = await saveActivity(activity);
    if (response?.status === 201 || response?.status === 200) {
      let message: any = `Activity ${response?.status === 200 ? 'Updated' : response.message}`
      setResponse(message)
      fetchActivites(filters)
    };
  }

  return (

    <>
      {modal && <Form
        activityForm={activityForm}
        setActivityForm={(newLead: any) => setActivityForm(newLead)}
        heading={modalHeading}
        statusOptions={statusOptions}
        closeModal={() => setModal(false)}
        refreshActivities={() => fetchActivites(filters)}
        setResponse={(message: any) => setResponse(message)}
      />}

      {response && <Alert response={response} setResponse={(value: any) => setResponse(value)} />}

      <Header>
        <Button lable="New Activity" icon={AddIcon} onClick={() => {
          setModalHeading('create activity')
          setModal(!modal)
          setActivityForm({});
        }} />
      </Header>

      <Filters filters={filters} setFilters={setFilters} count={activitiesCount} options={statusOptions} />

      {activities?.length ?
        <table className="w-full table-auto text-sm text-zinc-500">
          <tbody className='bg-zinc-100 text-zinc-600 font-semibold'>
            <tr>
              <td className='py-3 mb-3 px-4 rounded-tl-full rounded-bl-full'>name</td>
              <td className='py-3 mb-3 px-4'>notes</td>
              <td className='py-3 mb-3 px-4 text-center'>status</td>
              <td className='py-3 mb-3 px-4 rounded-tr-full rounded-br-full text-center'>action</td>
            </tr>
          </tbody>
          <tbody>
            {activities.map((activity: any, index: number) => (
              <tr key={index}>
                <td className='py-2 px-4 border-b border-dotted'>{activity.name}</td>
                <td className='py-2 px-4 border-b border-dotted'>{activity.notes}</td>
                <td className='py-2 px-4 border-b border-dotted text-center'>
                  <div className="flex gap-1 items-center justify-center my-1">
                    {activity?.statuses?.length ? activity.statuses.map((status: any) => <Tag label={status.value} className={status.style} />) : <></>}
                  </div>
                </td>
                <td className='py-2 px-4 border-b border-dotted text-right flex gap-2 justify-center'>
                  <Action className="p-2" width={30} icon={CopyIcon} onClick={() => {
                    cloneActivity({ ...activity, id: null })
                  }} />
                  <Action className="p-2" width={30} icon={EditIcon} onClick={() => {
                    setModalHeading('update activity')
                    setActivityForm(activity);
                    setModal(true);
                  }} />
                </td>
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