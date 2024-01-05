'use client'

import Tag from "@ui/tag";
import Edit from "@ui/edit";
import Heading from "@ui/heading";

interface Props {
  campaign: { name: string, status: string, startDate?: Date, endDate?: Date },
  className?: string,
}


const Campaign: React.FC<Props> = ({ campaign, className }) => {

  return (
    <div className={`flex flex-col justify-between  rounded-large cursor-pointer h-52 p-5 bg-zinc-50 border border-zinc-50 hover:border-dashed hover:border-lime-200 ${className}`}>
      <div className="flex items-center justify-between">
        <Heading label={campaign.name} />
        <div className="flex gap-1">
          <Tag label={campaign.status} />
          <Edit />
        </div>
      </div>

      <div className="align-bottom">
        <div className="flex justify-between text-xs text-zinc-800 py-2 border-b border-zinc-200 border-dashed">
          <b>Leads</b>
          <span>20 / 100</span>
        </div>

        <div className="flex justify-between text-xs text-zinc-600 py-2 border-b border-zinc-200 border-dashed">
          <b>start date</b>
          <span>12 July 2023</span>
        </div>

        <div className="flex justify-between text-xs text-zinc-500 py-2">
          <b>end date</b>
          <span>20 Mar 2024</span>
        </div>
      </div>
    </div>
  )

}


export default Campaign;
