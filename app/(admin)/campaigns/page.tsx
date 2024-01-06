'use client'

import Campaign from "@ui/campaign";
import Header from "@ui/header";
import Button from "@ui/button";
import AddIcon from "@icons/add.svg";


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

      <Header>
        <Button lable="New Campaign" icon={AddIcon} onClick={() => console.log('set campaign')} />
      </Header>

      <div className="filters">

      </div>
      <section className="grid grid-cols-3 gap-5">
        {campaigns.map((campaign, index) => <Campaign key={index} campaign={campaign} />)}
      </section>
    </>
  )

}

export default Campaigns;