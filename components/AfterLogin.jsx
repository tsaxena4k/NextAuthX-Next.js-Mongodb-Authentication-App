import React, { useState } from 'react';
import { useUser } from '../lib/hooks';
import { IoMdSend } from 'react-icons/io'

export default function afterLogin() {
    const [errorMsg, setErrorMsg] = useState("");
    const [user] = useUser();
    const [Loader, updateLoad] = useState(false);
    const [msgAck, setMsgAck] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        updateLoad(true);
        const body = {
            message: e.currentTarget.message.value,
            name: user.name
        };
        const res = await fetch("/api/message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        if (res.status === 201) {
            setMsgAck(true);
            setTimeout(() => setMsgAck(false), 2500)
        } else {
            setErrorMsg(await res.text());
        }
        updateLoad(false);
        var msgForm = document.getElementById("msgForm");
        msgForm.reset();
    };
    return (
        <>
            {/* <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-5">
                        <img src="..." class="img-fluid rounded-start" alt="..." />
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="row">
                <div className="col-sm-12">
                    <div className="card-text">
                        Hey you made it here {user ? user.name : 'Stranger'}, we all were waiting for you.<br />I hope you like this Authentication module, Its simple yet important to know.
                        I'll be updating it with many new stuff frequently.<br /><br />Till then you can look around.<strong> Don't forget to drop a message for me.</strong>
                    </div>
                </div>
                <div className="col-sm-12 my-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-form">
                                <div className='err-msg text-danger'> {errorMsg && <p>{errorMsg}</p>}</div>
                                {msgAck && <div class="alert alert-success" role="alert">
                                    Message Sent
                                </div>}
                                <form onSubmit={handleSubmit} id="msgForm">
                                    <div class="form-floating mb-3">
                                        <textarea class="form-control" placeholder="Leave a comment here" id="message" name="message"></textarea>
                                        <label for="floatingTextarea">Send Message</label>
                                    </div>
                                    <button type='submit' className='btn btn-primary'>{Loader ? <div class="spinner-border" role="status" style={{ width: '1.5rem', height: '1.5rem' }}>
                                        <span class="visually-hidden">Loading...</span>
                                    </div> : <>Send <IoMdSend /></>}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}