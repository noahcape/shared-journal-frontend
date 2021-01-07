import React, { useState, useEffect } from "react"
import { connect } from 'react-redux'
import { deleteRecipient, editJournalName, clearRecipients, getSettings } from '../store/actions/settingsActions'
import { Collapse, Typography, Tag, Button, Popconfirm, Input, Form, Alert } from 'antd';
import { EditOutlined } from '@ant-design/icons'
import RecipientAddModal from './RecipientAddModal'
import { getSettingsFromSelector } from "../store/selectors/settingsSelector";

const { Panel } = Collapse;
const { Text, Paragraph } = Typography
require("dotenv").config()

const UserSettings = ({ settings, deleteRecipient, editJournalName, clearRecipients, getSettings }) => {
    const [journalName, setJournalName] = useState()
    const [error, setError] = useState({ msg: '' })
    const [editName, setEditName] = useState(false)

    useEffect(() => {
        getSettings()
    }, [getSettings])

    const editJournalNameHandler = () => {
        if (journalName === "") { return setError("Your journal Name cannot be left empty") }

        editJournalName(journalName).then(() => {
            setEditName(false)
            setError({ ...error, msg: '' })
        }).catch((e) => setError({ ...error, msg: e.response.data.msg }))
    }

    return (
        <div>
            <h1>Settings</h1>
            <Collapse>
                <Panel header='Journal Name'>
                    {error.msg.length > 0 && <Alert style={styles.errorMsg} description={error.msg} type="error" action={<Button type='text' shape='circle' onClick={() => setError({ ...error, msg: '' })}>X</Button>} />}
                    {editName ? (
                        <Form>
                            <Form.Item label='Journal Name'>
                                <Input value={journalName} onChange={(e) => setJournalName(e.target.value)} />
                            </Form.Item>
                            <Form.Item>
                                <Button style={styles.journalNameButtons} onClick={() => { setEditName(false); setJournalName(settings.journal_name) }}>Cancel</Button>
                                <Button style={styles.journalNameButtons} type='primary' onClick={() => editJournalNameHandler()}>Submit</Button>
                            </Form.Item>
                        </Form>
                    ) : (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Text>{settings && settings.journal_name}</Text>
                                <Button type='text' shape='circle' onClick={() => { setEditName(true); setJournalName(settings.journal_name) }}><EditOutlined /></Button>
                            </div>
                        )
                    }
                </Panel>
                <Panel header='Journal Sharing Method'>
                    <Paragraph>Journals are shared with their recipients on the end of every month.</Paragraph>
                    <Paragraph>All posts made during the month are sent to your recipients.</Paragraph>
                </Panel>
                <Panel header='Journal Recipients'>
                    <Text>Share your monthly updates with others by entering their email below.</Text>
                    {settings && settings.recipients && <RecipientAddModal recipients={settings.recipients} />}
                    {settings && settings.recipients.length > 0 && <div style={styles.recipientContainer}>
                        {settings && settings.recipients.map((recipient, index) => {
                            return <Tag style={styles.recipientTag} key={index}>
                                <Text style={styles.recipientName}>{recipient}</Text>
                                <Button type='text' shape='circle' onClick={(e) => deleteRecipient(recipient)}>x</Button>
                            </Tag>
                        })}
                    </div>}
                    <Popconfirm title="Are you sure you want to delete your entire recipient list?" onConfirm={() => clearRecipients()} okText="Yes" cancelText="No">
                        {settings && settings.recipients.length > 0 && <Button danger>Delete All</Button>}
                    </Popconfirm>
                </Panel>
            </Collapse>
        </div>
    )
}

const mapStateToProps = () => ({
    settings: getSettingsFromSelector()
})

export default connect(mapStateToProps, { deleteRecipient, editJournalName, clearRecipients, getSettings })(UserSettings)

const styles = {
    startBulkAdd: {
        padding: 8,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'rgb(129, 139, 249)',
        borderRadius: 8,
        color: 'white'
    },
    deleteAll: {
        padding: 8,
        margin: 10,
        borderRadius: 8,
        backgroundColor: 'rgb(252, 167, 167)',
        color: 'white',
    },
    cancelButton: {
        padding: 8,
        margin: 10,
        borderRadius: 8,
        backgroundColor: 'rgb(129, 139, 249)',
        color: 'white'
    },
    deleteAllConfirm: {
        display: 'flex',
        alignItems: 'center'
    },
    recipientTag: {
        borderRadius: 8,
        padding: 2,
        margin: 5
    },
    recipientName: {
        padding: 4,
        fontSize: 12
    },
    recipientContainer: {
        padding: 2,
        border: '1px black solid',
        borderRadius: 8,
        maxHeight: 300,
        overflowY: 'auto',
        marginBottom: 15
    },
    addRecipient: {
        margin: '10px 10px 10px 0'
    },
    journalNameButtons: {
        marginRight: 10
    },
    errorMsg: {
        padding: 5,
        margin: '10px 0 10px 0'
    }
}