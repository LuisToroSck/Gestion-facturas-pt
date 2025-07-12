import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import api from '../services/api';
import { toast } from 'react-toastify';

function CreditNoteModal({ show, onHide, invoice, onSuccess }) {
    if (!invoice) return null;

    const [error, setError] = useState('');

    const pendingAmount = invoice.total_amount - (
        invoice.invoice_credit_note?.reduce((sum, n) => sum + n.credit_note_amount, 0) || 0
    );

    const [CreateCreditNoteDto, setCreateCreditNoteDto] = useState({
        invoiceNumber: invoice.invoiceNumber,
        creditNoteAmount: 0,
    });

    function postCreditNote() {
        api.post('/invoices/add-credit-note', CreateCreditNoteDto)
            .then(() => {
                setCreateCreditNoteDto({ invoiceNumber: invoice.invoiceNumber, creditNoteAmount: 0 });
                toast.success('Credit note added successfully');
                onHide();
                onSuccess();
            })
            .catch((error) => {
                toast.error('Error adding credit note');
                setError('Error al agregar la nota de crédito');
                console.error(error);
            });
    }

    const handleSubmit = () => {
        const amountValue = parseFloat(CreateCreditNoteDto.creditNoteAmount);

        if (isNaN(amountValue) || amountValue <= 0) {
            setError('El monto debe ser un número válido mayor a 0');
            return;
        }

        if (amountValue > pendingAmount) {
            setError(`El monto no puede superar el saldo pendiente: $${pendingAmount.toLocaleString()}`);
            return;
        }

        postCreditNote();
        setError('');
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Credit Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Invoice #{invoice.invoiceNumber}</strong></p>
                <p>Pending amount: <strong>${pendingAmount.toLocaleString()}</strong></p>

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ej: 50000"
                            value={CreateCreditNoteDto.creditNoteAmount}
                            onChange={(e) =>
                                setCreateCreditNoteDto({
                                    ...CreateCreditNoteDto,
                                    creditNoteAmount: e.target.value,
                                })
                            }
                        />
                    </Form.Group>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Button variant="success" onClick={handleSubmit}>Agregar NC</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default CreditNoteModal;