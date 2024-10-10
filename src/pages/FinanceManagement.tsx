import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../components/ui/elements/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/elements/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/elements/card";

const FinanceContainer = styled.div`
  padding: 2rem;
`;

const FileUploadArea = styled.div`
  border: 2px dashed #ccc;
  border-radius: 20px;
  width: 100%;
  margin: 20px 0;
  padding: 20px;
  text-align: center;
`;

interface FinanceManagementProps {
  isSignedIn: boolean;
  handleSignOut: () => Promise<void>;
}

const FinanceManagement: React.FC<FinanceManagementProps> = ({ isSignedIn, handleSignOut }) => {
  const [activeTab, setActiveTab] = useState("billing");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Placeholder for file upload logic
    console.log("File uploaded:", event.target.files);
  };

  return (
    <FinanceContainer>
      <h1>Finance Management</h1>
      <p>Manage billing, time tracking, and payroll in one place.</p>
      {isSignedIn && (
        <Button onClick={handleSignOut}>Sign Out</Button>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="time-tracking">Time Tracking</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
        </TabsList>
        
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUploadArea>
                <input type="file" onChange={handleFileUpload} accept=".pdf,.xlsx,.xls" />
                <p>Drag and drop or click to upload PDF or Excel files</p>
              </FileUploadArea>
              <p>Billing data and calculations will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="time-tracking">
          <Card>
            <CardHeader>
              <CardTitle>Time Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Time tracking data from t.ask.R! will be displayed here.</p>
              {/* Placeholder for time tracking data display */}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payroll">
          <Card>
            <CardHeader>
              <CardTitle>Payroll</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Payroll calculations based on employee hourly rates will be displayed here.</p>
              {/* Placeholder for payroll calculations */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </FinanceContainer>
  );
};

export default FinanceManagement;

// Developer Note:
// This file contains the Finance Management page component with tabs for Billing, Time Tracking, and Payroll.
// Placeholder content is used for file upload, data display, and calculations.
// TODO: Implement actual data fetching from t.ask.R! and integrate with AWS Amplify Gen 2.
// TODO: Add cloud accounting services integration placeholders.
// TODO: Implement proper file upload and processing logic for billing documents.