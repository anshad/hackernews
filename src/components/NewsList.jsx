import React from 'react';
import Table from './table';

const NewsList = () => {
  return (
    <Table>
      <Table.TableHead>
        <Table.TableHeadRow>
          <Table.TableHeadColumn>Comments</Table.TableHeadColumn>
          <Table.TableHeadColumn>Vote Count</Table.TableHeadColumn>
          <Table.TableHeadColumn>Up Vote</Table.TableHeadColumn>
          <Table.TableHeadColumn>News Details</Table.TableHeadColumn>
        </Table.TableHeadRow>
      </Table.TableHead>
      <Table.TableBody>
        <Table.TableBodyRow className='noRecords'>
          <Table.TableBodyColumn colSpan={4} className='noRecords'>
            No records found!
          </Table.TableBodyColumn>
        </Table.TableBodyRow>
      </Table.TableBody>
    </Table>
  );
};

export default NewsList;
