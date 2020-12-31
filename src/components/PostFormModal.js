import React from "react"
import Modal from "../modals/Modal"
import useModal from "../customStates/useModal"
import ImagePreview from "./ImagePreview"

function PostFormModal(props) {
    const { isShowing, toggle } = useModal()

    const renderTextArea = () => {
        return (
            <form>
                <textarea
                    className="textarea-form-modal"
                    type="textarea"
                    value={props.post || ""}
                    onChange={(e) => props.handleChange(e)}
                    placeholder="Start a new post"
                />
            </form>
        )
    }

    const renderImagePreview = () => {
        return (
            <div className="images-post-form-modal">
                {props.images.length === 0 ? (
                    <input type="file" className="fill" accept="image/*" multiple={true} onChange={props.handleFileUpload} />
                ) : (
                        <div className="fill">
                            <ImagePreview images={props.images} deleteImage={props.deleteImage} />
                        </div>
                    )
                }
            </div>
        )
    }

    return (
        <>
            <button className="post-form-modal-expand-button" onClick={toggle}>Expand</button>
            <Modal isShowing={isShowing}>
                <div className="post-form-modal">
                    {renderImagePreview()}
                    {renderTextArea()}
                    <div className="post-form-button-grid">
                        <button className="post-form-modal-collapse-button" onClick={toggle}>Collapse</button>
                        <button className="post-form-modal-submit-button" onClick={props.newPost}>Submit</button>
                    </div>
                    <label>Date
                        <input
                            type='date'
                            value={props.date}
                            onChange={(e) => props.setDate(e.target.value)}
                        />
                        <button onClick={() => props.setDate('')}>clear</button>
                    </label>
                </div>
            </Modal>
        </>
    )
}

export default PostFormModal;