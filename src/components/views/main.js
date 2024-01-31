import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Main() {
  const [records, setRecords] = useState([]);
  const [recordsToShow, setRecordsToShow] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts',
        );
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    var newRecordsToShow = records.filter(
      r =>
        r.userId.toString().match(search.toString()) ||
        r.body.toString().match(search.toString()),
    );

    setRecordsToShow(newRecordsToShow);
  }, [records, search]);

  function sortRecords(newSortBy) {
    var newSortDirection =
      newSortBy === sortBy && sortDirection === 'asc' ? 'desc' : 'asc';

    var newRecordsToShow = recordsToShow.sort((a, b) => {
      const valueA = a[newSortBy];
      const valueB = b[newSortBy];

      if (newSortDirection === 'asc')
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      else return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    });

    setRecordsToShow(newRecordsToShow);
    setSortBy(newSortBy);
    setSortDirection(newSortDirection);
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form.Control
            className="App-filter"
            size="lg"
            type="text"
            placeholder="Type in to search by body or user id"
            onChange={event => setSearch(event.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table className="App-table" responsive>
            <thead>
              <tr>
                <th>
                  <Button variant="link" onClick={() => sortRecords('id')}>
                    Id
                  </Button>
                </th>
                <th>
                  <Button variant="link" onClick={() => sortRecords('title')}>
                    Title
                  </Button>
                </th>
                <th>
                  <Button variant="link" onClick={() => sortRecords('body')}>
                    Body
                  </Button>
                </th>
                <th>
                  <Button variant="link" onClick={() => sortRecords('userId')}>
                    User Id
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {recordsToShow.map((r, index) => (
                <tr key={index}>
                  <td>{r.id}</td>
                  <td>{r.title}</td>
                  <td>{r.body}</td>
                  <td>{r.userId}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Main;
