import Card from 'react-bootstrap/Card';

function CardResume({ title, value }) {
    return (
        <Card style={{backgroundColor:"#f5f5f5", border:"none"}}>
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
