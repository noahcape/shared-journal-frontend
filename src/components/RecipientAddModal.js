import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Input, Form } from 'antd'
import { UsergroupAddOutlined, UserAddOutlined } from '@ant-design/icons'
import { bulkAddRecipients, addRecipient } from '../store/actions/settingsActions'
require("dotenv").config()

const { TextArea } = Input

const RecipientAddModal = ({ recipients, bulkAddRecipients, addRecipient }) => {
    const re = /\S+@\S+\.\S+/
    const [isVisible, setIsVisible] = React.useState(false)
    const [isBulkAdd, setIsBulkAdd] = React.useState(false)
    const [bulkRecipients, setBulkRecipients] = React.useState('')
    const [singleRecipient, setSingleRecipient] = React.useState('')

    const cleanUp = () => {
        setIsVisible(false)
        setIsBulkAdd(false)
        setBulkRecipients('')
        setSingleRecipient('')
    }

    const submitBulk = () => {
        let noErrors = true
        if (bulkRecipients === '') {
            noErrors = false
            alert('You must include at least one recipient')
        }
        const recipientsArray = bulkRecipients.split(", ")
        recipientsArray.forEach(recipient => {
            if (!re.test(recipient)) {
                noErrors = false
                alert(`"${recipient}" is not a valid email`)
            }
        })
        if (noErrors) {
            bulkAddRecipients(bulkRecipients).then(() => cleanUp())
        }
    }

    const submitSingle = () => {
        if (singleRecipient === "") { return alert("You cannot leave recipient blank") }
        if (!re.test(singleRecipient)) { return alert(`"${singleRecipient}" is not a valid email`) }
        if (!recipients.includes(singleRecipient)) {
            addRecipient(singleRecipient).then(() => cleanUp())
        } else {
            alert(`Your recipient list already contains ${singleRecipient}`)
        }
    }

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <Button style={styles.addRecipient} onClick={() => {
                    setIsVisible(true)
                    setIsBulkAdd(true)
                }}><UsergroupAddOutlined />Add many Recipients</Button>
                <Button style={styles.addRecipient} onClick={() => {
                    setIsVisible(true)
                }}><UserAddOutlined />Add one Recipient</Button>
            </div>
            <Modal title={isBulkAdd ? ('Bulk Add') : ('Single Add')} style={styles.modal} visible={isVisible} onOk={isBulkAdd ? submitBulk : submitSingle} onCancel={cleanUp} okText='Submit' cancelText='Cancel'>
                {isBulkAdd ? (
                    <Form>
                        <p>Example: 'example@email.com, bestfriend@forever.com, secondcousin@family.com'</p>
                        <TextArea value={bulkRecipients} style={styles.bulkAddTextArea} onChange={(e) => setBulkRecipients(e.target.value)} placeholder='add many recipients...' />
                    </Form>
                ) : (
                        <Form>
                            <Form.Item label='Recipient'>
                                <Input type="email" placeholder="email..." value={singleRecipient} onChange={(e) => setSingleRecipient(e.target.value)} />
                            </Form.Item>
                        </Form>
                    )}
            </Modal>
        </div>

    )
}

export default connect(null, { bulkAddRecipients, addRecipient })(RecipientAddModal)

const styles = {
    modal: {
        width: 'auto'
    },
    addRecipient: {
        margin: '10px 10px 10px 0'
    },
    bulkAddTextArea: {
        resize: 'none',
        height: 150,
        maxHeight: 350,
        overflowY: 'auto',
    },
}
