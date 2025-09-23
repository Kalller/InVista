import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

function BugReportForm() {
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [category, setCategory] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [description, setDescription] = useState('');
  const maxDescriptionLength = 200;

  const handleClose = () => {
    setShow(false);
    setSubmissionSuccess(false);
    setCategory('');
    setScreenshot(null);
    setDescription('');
  };

  const handleShow = () => setShow(true);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setScreenshot(file);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxDescriptionLength) {
      setDescription(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    setIsSubmitting(true);
    // Simulate submitting the form for 1 second
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
    }, 700);
  };

  return (
    <>
      <Button className='' variant="danger" onClick={handleShow}>
      <i className="bi bi-life-preserver"></i>
        Found a Bug?
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Report a Bug</Modal.Title>
          {/* custom button close */}
          <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleClose}></button>
        </Modal.Header>
        <Modal.Body>
          {submissionSuccess ? (
            <div className="text-center">
              <i className="bi bi-check-lg text-success" style={{ fontSize: "3em" }}></i>
              <h3>Submission Successful</h3>
              <p>Your bug report has been submitted.</p>
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                <Form.Label>Category</Form.Label>
                <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} required>
                  <option value="">Select a category...</option>
                  <option value="UI/UX">Visual Bug</option>
                  <option value="Functionality">Functionality</option>
                  <option value="Performance">Performance</option>
                  <option value="Compatibility">Compatibility</option>
                  <option value="Security">Security</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description (Max {maxDescriptionLength} characters)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={handleDescriptionChange}
                  maxLength={maxDescriptionLength}
                  required
                />
                <Form.Text className="text-muted">{description.length}/{maxDescriptionLength}</Form.Text>
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlFile1" className="mb-3">
                <Form.Label>Attach Screenshot (optional)</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
              </Form.Group>

              {isSubmitting && (
                <div className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BugReportForm;
