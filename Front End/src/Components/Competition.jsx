import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompetitions } from '../slices/competitionSlice';
import { useNavigate } from 'react-router-dom';

function Competition() {

    const dispatch = useDispatch()
    const competitionState = useSelector(state => state.competition)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllCompetitions())
    }, [])

    if (competitionState.status === "loading") {
        return <h1>Loading...</h1>
    }




    function CompetitionEntry({ name, status, tags, id }) {
        // console.log(name);
        console.log("here");
        console.log("name = ", name, "Status = ", status, "tags = ", tags);

        return (
            <div className="competition_entry">
                <p className='competition_entry_content'>
                    {name}
                </p>
                {/* <br />  */}
                <hr style={{ height: '50%', width: '50%', margin: 'auto', marginTop: '3%' }} />
                <div className='competition_entry_rest'>
                    <div className='competition_entry_status_div'>
                        <p className='competition_entry_status'>
                            , {`${status == "live" ? "جاری" : "مکمل"}`}
                        </p>
                        <p className='competition_entry_category'>
                            {`-${tags.map(tag => tag.value).join(", ")}`}
                        </p>
                    </div>
                    <button className='competition_entry_submit'
                        onClick={(e) => {
                            navigate(`/viewCompetition/${id}`)
                        }}>
                        کہانی جمع کروائیں
                    </button>
                </div>
            </div>
        )
    }

    const renderComps = () => {
        return competitionState.competitions.map((comp, index) => {
            // console.log(comp);
            let { name, status, tags } = comp
            // console.log(`Tags: ${tags.map(tag => tag.value).join(", ")}`);

            return <CompetitionEntry
                key={index}
                name={name}
                status={status}
                tags={tags}
                id={index}
            ></CompetitionEntry>
        })
    }

    return (

        <div className='competition'>
            <div className='loginHeading'>
                <img src="./src/assets/logo.png" alt="" />
                <h1 className=''>
                    مقابلہ جات فہرست
                </h1>

            </div>
            {/* <CompetitionEntry></CompetitionEntry>
            <CompetitionEntry></CompetitionEntry>
            <CompetitionEntry></CompetitionEntry>
            <CompetitionEntry></CompetitionEntry>
            <CompetitionEntry></CompetitionEntry> */}
            {renderComps()}

        </div>
    )
}

export default Competition