import React, { useState }  from "react"
import axios from "axios";
import Layout from "../components/layouts"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "gatsby";


const MyForm = () => {

    const [serverState, setServerState] = useState({
        submitting: false,
        status: null
    });
    const handleServerResponse = (ok, msg, form) => {
        setServerState({
            submitting: false,
            status: { ok, msg }
        });
        if (ok) {
            form.reset();
        }
    };
    const handleOnSubmit = e => {
        e.preventDefault();
        const form = e.target;
        setServerState({ submitting: true });
        axios({
            method: "post",
            url: "https://getform.io/f/c6d8d439-9d4c-4a34-8b77-1d8c5979b5e6",
            data: new FormData(form)
        })
            .then(r => {
                handleServerResponse(true, "Thanks!", form);
            })
            .catch(r => {
                handleServerResponse(false, r.response.data.error, form);
            });
    };
    return (
        <Layout>

            <div>
                <div className="col-md-8 mt-5">
                    <h3>Getform.io Gatsby Form Example</h3>
                    <div className="back">
                        <Link to="/">back to home</Link>
                    </div>
                    <form onSubmit={handleOnSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" required="required">Email address</label>
                            <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputName">Name</label>
                            <input type="text" name="name" className="form-control" id="exampleInputName" placeholder="Enter your name" required="required"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Favourite Platform</label>
                            <select className="form-control" id="exampleFormControlSelect1" name="platform" required="required">
                                <option>Github</option>
                                <option>Gitlab</option>
                                <option>Bitbucket</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormTextArea1">Comments</label>
                            <textarea className="form-control" id="exampleFormTextArea1" name="comments" required="required" />
                        </div>
                        <button type="submit" className="btn btn-primary"  disabled={serverState.submitting}>
                            Submit
                        </button>
                        {serverState.status && (
                            <p className={!serverState.status.ok ? "errorMsg" : ""}>
                                {serverState.status.msg}
                            </p>
                        )}
                    </form>
                </div>
            </div>

        </Layout>

    );
};

export default MyForm;