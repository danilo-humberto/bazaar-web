import React from "react";
import AsideContent from "./asideContent";
import FormContent from './formContent'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import { Grid, GridColumn, Divider } from 'semantic-ui-react'

import './registerPage.css'

export default function RegisterPage() {
    return (
        <div>
            <Header />
            <div className="content">
                <Grid columns={2} padded='vertically'>
                    <GridColumn width={8}>
                        <AsideContent />
                    </GridColumn>
                    <GridColumn width={8}>
                        <FormContent />
                    </GridColumn>
                </Grid>
                <Divider vertical/>
            </div>
            <Footer />
        </div>
    )
}