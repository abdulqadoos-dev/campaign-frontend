'use client'

import Campaign from "../ui/campaign";

const Campaigns: React.FC<{}> = () => {

  const campaigns = [
    {
      name: "linkedin leads",
      status: "active"
    },
    {
      name: "Person emails",
      status: "active"
    }
  ]


  return (
    <>
      <div className="filters">

      </div>
      <section className="grid grid-cols-3 gap-5">
        {campaigns.map(campaign => <Campaign campaign={campaign} />)}
      </section>
    </>
  )

}

export default Campaigns;