import { StyleSheet, Text, View } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

export type IngredientsTableProps = {
    headRow: string[],
    headRowFlex: number[],
    rowsData: (string | number)[][],
    rowsFlex: number[],
    renderCheckboxes: boolean,
    checkboxes?: any,
}

const IngredientTable = (props: IngredientsTableProps) => {
  return (
    <Table borderStyle={{borderWidth: 0.5}}>
        <Row data={props.headRow} flexArr={props.headRowFlex} style={styles.head} textStyle={styles.text}/>
        <TableWrapper style={styles.wrapper}>
            {props.checkboxes ? <Col data={props.checkboxes} style={styles.title} /> : <></>}
            <Rows data={props.rowsData} flexArr={props.rowsFlex} style={styles.row} textStyle={styles.text}/>
        </TableWrapper>
    </Table>
  )
}

export default IngredientTable;

const styles = StyleSheet.create({
    head: { 
        height: 40,  
        backgroundColor: '#f1f8ff'  
    },
    wrapper: { 
        flexDirection: 'row' 
    },
    title: { 
        backgroundColor: '#f6f8fa', 
    },
    row: {  
        height: 28,
        backgroundColor: '#fff'
    },
    text: { 
        textAlign: 'center', 
        fontSize: 12 
    },
    checkbox: {
        marginHorizontal: 10,
    },
})