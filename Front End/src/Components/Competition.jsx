import React from 'react'

function Competition() {

    function CompetitionEntry() {
        return (
            <div className="competition_entry">
                <p className='competition_entry_content'>"خشک سالی کے مہینے کے دوران اپنی کہانی ترتیب دیں - چاہے لفظی ہو، یا استعاراتی"</p>
                <div className='competition_entry_rest'>
                    <div className='competition_entry_status_div'>
                        <p className='competition_entry_status'>لایو</p>
                        <p className='competition_entry_category'>- ہارر</p>
                    </div>
                    <button className='competition_entry_submit' onClick={(e) => { console.log(e.target); }}>کہانی جمع کروائیں</button>
                </div>
            </div>
        )
    }

    return (

        <div className='competition'>
            <div className='loginHeading'>
                <img src="./src/assets/logo.png" alt="" />
                <h1 className=''>
                    مقابلہ جات فہرست
                </h1>

            </div>
            <CompetitionEntry></CompetitionEntry>
            <CompetitionEntry></CompetitionEntry>
            <CompetitionEntry></CompetitionEntry>
            <CompetitionEntry></CompetitionEntry>
            <CompetitionEntry></CompetitionEntry>

        </div>
    )
}

export default Competition