import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css'

import useAPIRequest from '../hooks/useAPIRequest';

function Farms() {
    const [farmname, setFarmname] = useState("");
    const [farmemail, setFarmemail] = useState("");
    async function postFarm(e) {
        e.preventDefault();
        console.log("== Adding farm with these parameters:", farmname, farmemail);
        //const res = await fetch('/api/accessBackend/https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name) VALUES (%s) /'+farmname,{
        const res = await fetch('/api/accessBackend', {
            method: 'POST',
            body: JSON.stringify( {
                table_name: "farms",
                query_type: "INSERT",
                query_fields: ['farm_name'],
                query_values: [farmname]
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resBody = await res.json();
        console.log(resBody);
    }

    return (
        <Layout>
        <form onSubmit={postFarm} className={styles.container}>
            <div>
                <input
                    type="text"
                    placeholder="Farm name"
                    onChange={e => setFarmname(e.target.value)}
                    value={farmname}
                    />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Email"
                    onChange={e => setFarmemail(e.target.value)}
                    value={farmemail}
                    />
            </div>
            <div>
                <label for="phone">Enter Farm phone number:</label>
                <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                <small>Format: 123-456-7890</small><br></br>
            </div>
            <div>
                <button>Add Farm</button>
            </div>
        </form>
        </Layout>
    );
}

export default Farms;
