import React from "react";
import { Card } from "react-bootstrap";
import { Form } from "react-router-dom";

const ViewSummaries = () => {

    return (
        <div className="ViewSummaries">
            <Form>
                <div className="upload">
                    <Form>
                        <Card style={{ width: "80vw"}}>
                            <Card.Body>
                                <Card.Text style={{color: "#1e328d"}}>
                                    Upload summary
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Form>
                </div>
                <div className="posts">
                    Posts
                </div>
            </Form>
        </div>
    )
}

export default ViewSummaries;