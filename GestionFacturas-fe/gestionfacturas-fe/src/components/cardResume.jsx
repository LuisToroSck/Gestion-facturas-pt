import Card from 'react-bootstrap/Card';

function CardResume({ title, value }) {
    return (
        <Card>
            <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">{title}</Card.Subtitle>
                <Card.Text>
                    <h4>{value}</h4>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CardResume;
