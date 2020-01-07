
import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

export default function Documento() {

    // Create styles
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#FFF'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });
    // Create Document Component
    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Fecha Actualización: 06/12/2019</Text>
                </View>
                <View style={styles.section}>
                    <Text>REPORTE SEMANAL DE EJECUCIÓN DE LA INVERSIÓN</Text>
                </View>
                <View style={styles.section}>
                    <Text>Programa: Programa Arrocero</Text>
                </View>
                <View style={styles.section}>
                    <Text>Obra: Molino-Secadero de arroz Batalla de Santa Clara</Text>
                </View>
                <View style={styles.section}>
                    <Text>Inversionista: EAIG                                   Constructora: ETA VC-ECM VC-UEB de la EAIG de Aguada en Cienfueg</Text>
                </View>
                <View style={styles.section}>
                    <Text>Tabla No.1</Text>
                </View>
            </Page>
        </Document>
    );
    return (
        <div>
            <PDFViewer style={{ width: '90%', height: '70vh' }}>
                <MyDocument />
            </PDFViewer>
        </div>
    );
}