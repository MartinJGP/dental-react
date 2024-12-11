import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View,StyleSheet ,PDFViewer,Image} from '@react-pdf/renderer';
import {returnToken} from "../Config/auth";
import axios from "axios";
import logo from "../assets/images/logo.png";

const VerPdf = () => {
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            padding: 20,
            fontFamily: 'Helvetica',
        },
        header: {
            backgroundColor: 'white',
            padding: 10,
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        headerText: {
            color: 'black',
            fontSize: 18,
            fontWeight: 'bold',
            paddingRight: 10,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            borderBottom: 1,
        },
        label: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        value: {
            fontSize: 16,
        },
        table: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 20,
        },
        tableCell: {
            width: '50%',
            padding: 5,
        },
        tableCellLast: {
            width: '50%',
            padding: 5,
        },
    });

    // useState
    const [pago, setPago] = useState('');
    const [cita, setCita] = useState('');
    const [horario, setHorario] = useState('');
    // Obtener citaId del parámetro
    const url = window.location.href;
    const urlObj = new URL(url);
    const id = urlObj.searchParams.get('id');
    useEffect(() => {
        obtenerPago(id).catch((error) => {
            console.error('Error al obtener el pago:', error);
        });
    }, [id]);


    // Obtener información de pago
    async function obtenerPago(id) {
        try {
            const response = await axios.get(
                `https://dental-tcdg.onrender.com/api/pagos/getbycita/${id}`,
                returnToken()
            ).then((response) => {
                setPago(response.data);
                setCita(response.data.cita);
                setHorario(response.data.cita.horario);
            })
        } catch (error) {
            console.error('Error al obtener el pago:', error);
        }
    }

    return (
        <div style={{minHeight:"100vh"}}>
            {pago.id?(
        <PDFViewer style={{width:"100%",height:"100vh"}}>
            <Document>
                <Page size="A4">
                    <View style={styles.page}>
                        <View style={styles.header}>
                            <Image src={logo} style={{ width: 300, height: 100 }} />
                        </View>

                        <View style={styles.page}>
                            <Text style={styles.title}>Boleta de Pago</Text>

                            <View style={styles.table}>
                                <View style={styles.tableCell}>
                                    <Text style={styles.label}>Código de Pago:</Text>
                                </View>
                                <View style={styles.tableCellLast}>
                                    <Text style={styles.value}>{pago.codigo}</Text>
                                </View>
                            </View>

                            <View style={styles.table}>
                                <View style={styles.tableCell}>
                                    <Text style={styles.label}>Descripción:</Text>
                                </View>
                                <View style={styles.tableCellLast}>
                                    <Text style={styles.value}>{pago.servicio}</Text>
                                </View>
                            </View>

                            <View style={styles.table}>
                                <View style={styles.tableCell}>
                                    <Text style={styles.label}>Monto:</Text>
                                </View>
                                <View style={styles.tableCellLast}>
                                    <Text style={styles.value}>{`S/. ${pago.monto}`}</Text>
                                </View>
                            </View>

                            <View style={styles.table}>
                                <View style={styles.tableCell}>
                                    <Text style={styles.label}>Fecha de Pago:</Text>
                                </View>
                                <View style={styles.tableCellLast}>
                                    <Text style={styles.value}>{pago.fechaPago}</Text>
                                </View>
                            </View>

                            <Text style={styles.title}>Datos del Servicio</Text>

                            <View style={styles.table}>
                                <View style={styles.tableCell}>
                                    <Text style={styles.label}>Paciente:</Text>
                                </View>
                                <View style={styles.tableCellLast}>
                                    <Text style={styles.value}>{cita.nombresapellidos}</Text>
                                </View>
                            </View>

                            <View style={styles.table}>
                                <View style={styles.tableCell}>
                                    <Text style={styles.label}>Documento de Identidad:</Text>
                                </View>
                                <View style={styles.tableCellLast}>
                                    <Text style={styles.value}>{cita.documento}</Text>
                                </View>
                            </View>

                            <View style={styles.table}>
                                <View style={styles.tableCell}>
                                    <Text style={styles.label}>Fecha de Cita:</Text>
                                </View>
                                <View style={styles.tableCellLast}>
                                    <Text style={styles.value}>{horario.fecha}</Text>
                                </View>
                            </View>

                            <View style={styles.table}>
                                <View style={styles.tableCell}>
                                    <Text style={styles.label}>Horario:</Text>
                                </View>
                                <View style={styles.tableCellLast}>
                                    <Text style={styles.value}>{`De las ${horario.horaInicio} a las ${horario.horaFin}`}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
            ):(
                <div className="text-center" style={{marginTop:200}}>
                    <h1>Cargando...</h1>
                </div>
            )}
        </div>
    );
};

export default VerPdf;
