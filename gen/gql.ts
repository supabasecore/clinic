import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Auxiliary = {
  __typename?: 'Auxiliary';
  comment?: Maybe<Scalars['String']['output']>;
  diaryId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  service?: Maybe<Service>;
  serviceId: Scalars['Int']['output'];
};

export type AuxiliaryFieldError = {
  __typename?: 'AuxiliaryFieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type AuxiliaryInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  diaryId: Scalars['Int']['input'];
  serviceId: Scalars['Int']['input'];
};

export type AuxiliaryResponse = {
  __typename?: 'AuxiliaryResponse';
  auxiliary?: Maybe<Auxiliary>;
  errors?: Maybe<Array<AuxiliaryFieldError>>;
};

export type Comprehensive = {
  __typename?: 'Comprehensive';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['Int']['output'];
  isSurgery?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  service: Array<Service>;
  serviceCount?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type ComprehensiveFieldError = {
  __typename?: 'ComprehensiveFieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type ComprehensiveInput = {
  isSurgery?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

export type ComprehensiveResponse = {
  __typename?: 'ComprehensiveResponse';
  comprehensive?: Maybe<Comprehensive>;
  errors?: Maybe<Array<ComprehensiveFieldError>>;
};

export type Diagnostic = {
  __typename?: 'Diagnostic';
  cie: Scalars['String']['output'];
  definitive?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  diaryId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  presumptive?: Maybe<Scalars['String']['output']>;
  repetitive?: Maybe<Scalars['String']['output']>;
};

export type DiagnosticFieldError = {
  __typename?: 'DiagnosticFieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type DiagnosticInput = {
  cie: Scalars['String']['input'];
  definitive?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  diaryId: Scalars['Int']['input'];
  presumptive?: InputMaybe<Scalars['String']['input']>;
  repetitive?: InputMaybe<Scalars['String']['input']>;
};

export type DiagnosticResponse = {
  __typename?: 'DiagnosticResponse';
  diagnostic?: Maybe<Diagnostic>;
  errors?: Maybe<Array<DiagnosticFieldError>>;
};

export type Diary = {
  __typename?: 'Diary';
  auxiliary: Array<Auxiliary>;
  createdAt: Scalars['DateTimeISO']['output'];
  diagnostic: Array<Diagnostic>;
  disease: Array<Disease>;
  endTime?: Maybe<Scalars['DateTimeISO']['output']>;
  history: Array<History>;
  id: Scalars['Int']['output'];
  interconsultation?: Maybe<Scalars['String']['output']>;
  intervention?: Maybe<Scalars['String']['output']>;
  nextTime?: Maybe<Scalars['DateTimeISO']['output']>;
  patient: Patient;
  patientId: Scalars['Int']['output'];
  price: Scalars['Float']['output'];
  service: Service;
  serviceId: Scalars['Int']['output'];
  startTime: Scalars['DateTimeISO']['output'];
  status: Scalars['String']['output'];
  treatment: Array<Treatment>;
  updatedAt: Scalars['DateTimeISO']['output'];
  vital: Array<Vital>;
  weight?: Maybe<Scalars['Float']['output']>;
};

export type DiaryFieldError = {
  __typename?: 'DiaryFieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type DiaryInput = {
  endTime?: InputMaybe<Scalars['DateTimeISO']['input']>;
  interconsultation?: InputMaybe<Scalars['String']['input']>;
  intervention?: InputMaybe<Scalars['String']['input']>;
  nextTime?: InputMaybe<Scalars['DateTimeISO']['input']>;
  patientId: Scalars['Int']['input'];
  price?: InputMaybe<Scalars['Float']['input']>;
  serviceId: Scalars['Int']['input'];
  startTime: Scalars['DateTimeISO']['input'];
  status?: Scalars['String']['input'];
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type DiaryResponse = {
  __typename?: 'DiaryResponse';
  diary?: Maybe<Diary>;
  errors?: Maybe<Array<DiaryFieldError>>;
};

export type DiaryStateInput = {
  interconsultation?: InputMaybe<Scalars['String']['input']>;
  intervention?: InputMaybe<Scalars['String']['input']>;
  nextTime?: InputMaybe<Scalars['DateTimeISO']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  startTime: Scalars['DateTimeISO']['input'];
  status?: Scalars['String']['input'];
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type Disease = {
  __typename?: 'Disease';
  comment?: Maybe<Scalars['String']['output']>;
  diaryId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isCourse: Scalars['Boolean']['output'];
  isStart: Scalars['Boolean']['output'];
  sickTime?: Maybe<Scalars['Int']['output']>;
};

export type DiseaseFieldError = {
  __typename?: 'DiseaseFieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type DiseaseInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  diaryId: Scalars['Int']['input'];
  isCourse: Scalars['Boolean']['input'];
  isStart: Scalars['Boolean']['input'];
  sickTime?: InputMaybe<Scalars['Int']['input']>;
};

export type DiseaseResponse = {
  __typename?: 'DiseaseResponse';
  disease?: Maybe<Disease>;
  errors?: Maybe<Array<DiseaseFieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type History = {
  __typename?: 'History';
  diaryId: Scalars['Int']['output'];
  disease: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  person: Scalars['String']['output'];
};

export type HistoryFieldError = {
  __typename?: 'HistoryFieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type HistoryInput = {
  diaryId: Scalars['Int']['input'];
  disease: Scalars['String']['input'];
  person: Scalars['String']['input'];
};

export type HistoryResponse = {
  __typename?: 'HistoryResponse';
  errors?: Maybe<Array<HistoryFieldError>>;
  history?: Maybe<History>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAuxiliary: AuxiliaryResponse;
  createComprehensive: ComprehensiveResponse;
  createDiagnostic: DiagnosticResponse;
  createDiary: DiaryResponse;
  createDisease: DiseaseResponse;
  createHistory: HistoryResponse;
  createPatient: PatientResponse;
  createService: ServiceResponse;
  createTreatment: TreatmentResponse;
  createVital: VitalResponse;
  deleteComprehensive: Scalars['Boolean']['output'];
  deleteDiary: Scalars['Boolean']['output'];
  deletePatient: Scalars['Boolean']['output'];
  login: UserResponse;
  logout: Scalars['Boolean']['output'];
  register: UserResponse;
  updateDiaryStatus: DiaryResponse;
};


export type MutationCreateAuxiliaryArgs = {
  input: AuxiliaryInput;
};


export type MutationCreateComprehensiveArgs = {
  input: ComprehensiveInput;
};


export type MutationCreateDiagnosticArgs = {
  input: DiagnosticInput;
};


export type MutationCreateDiaryArgs = {
  input: DiaryInput;
};


export type MutationCreateDiseaseArgs = {
  input: DiseaseInput;
};


export type MutationCreateHistoryArgs = {
  input: HistoryInput;
};


export type MutationCreatePatientArgs = {
  dni: Scalars['String']['input'];
};


export type MutationCreateServiceArgs = {
  input: ServiceInput;
};


export type MutationCreateTreatmentArgs = {
  input: TreatmentInput;
};


export type MutationCreateVitalArgs = {
  input: VitalInput;
};


export type MutationDeleteComprehensiveArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteDiaryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePatientArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  usernameOrEmail: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdateDiaryStatusArgs = {
  id: Scalars['Int']['input'];
  input: DiaryStateInput;
};

export type Patient = {
  __typename?: 'Patient';
  createdAt: Scalars['DateTimeISO']['output'];
  diaryCount?: Maybe<Scalars['Int']['output']>;
  dni: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastname: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type PatientFieldError = {
  __typename?: 'PatientFieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type PatientResponse = {
  __typename?: 'PatientResponse';
  errors?: Maybe<Array<PatientFieldError>>;
  patient?: Maybe<Patient>;
};

export type Query = {
  __typename?: 'Query';
  allServices?: Maybe<Array<Service>>;
  comprehensives?: Maybe<Array<Comprehensive>>;
  diary?: Maybe<Array<Diary>>;
  me?: Maybe<User>;
  patients?: Maybe<Array<Patient>>;
  services?: Maybe<Array<Service>>;
};


export type QueryServicesArgs = {
  isSurgery: Scalars['Boolean']['input'];
};

export type Service = {
  __typename?: 'Service';
  comprehensive?: Maybe<Comprehensive>;
  comprehensiveId: Scalars['Int']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type ServiceFieldError = {
  __typename?: 'ServiceFieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type ServiceInput = {
  comprehensiveId: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type ServiceResponse = {
  __typename?: 'ServiceResponse';
  errors?: Maybe<Array<ServiceFieldError>>;
  service?: Maybe<Service>;
};

export type Treatment = {
  __typename?: 'Treatment';
  days?: Maybe<Scalars['Int']['output']>;
  diaryId: Scalars['Int']['output'];
  dose?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  medicine?: Maybe<Scalars['String']['output']>;
  presentation?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
};

export type TreatmentFieldError = {
  __typename?: 'TreatmentFieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type TreatmentInput = {
  days?: InputMaybe<Scalars['Int']['input']>;
  diaryId: Scalars['Int']['input'];
  dose?: InputMaybe<Scalars['Int']['input']>;
  medicine?: InputMaybe<Scalars['String']['input']>;
  presentation?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type TreatmentResponse = {
  __typename?: 'TreatmentResponse';
  errors?: Maybe<Array<TreatmentFieldError>>;
  treatment?: Maybe<Treatment>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firm?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  updatedAt: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Vital = {
  __typename?: 'Vital';
  arterial?: Maybe<Scalars['Float']['output']>;
  cardiac?: Maybe<Scalars['Float']['output']>;
  comment: Scalars['String']['output'];
  diaryId: Scalars['Int']['output'];
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Int']['output'];
  oxygen?: Maybe<Scalars['Float']['output']>;
  respiratory?: Maybe<Scalars['Float']['output']>;
  temp?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
};

export type VitalFieldError = {
  __typename?: 'VitalFieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type VitalInput = {
  arterial?: InputMaybe<Scalars['Float']['input']>;
  cardiac?: InputMaybe<Scalars['Float']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  diaryId: Scalars['Int']['input'];
  height?: InputMaybe<Scalars['Float']['input']>;
  oxygen?: InputMaybe<Scalars['Float']['input']>;
  respiratory?: InputMaybe<Scalars['Float']['input']>;
  temp?: InputMaybe<Scalars['Float']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type VitalResponse = {
  __typename?: 'VitalResponse';
  errors?: Maybe<Array<VitalFieldError>>;
  vital?: Maybe<Vital>;
};

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: number } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type CreateAuxiliaryMutationVariables = Exact<{
  input: AuxiliaryInput;
}>;


export type CreateAuxiliaryMutation = { __typename?: 'Mutation', createAuxiliary: { __typename?: 'AuxiliaryResponse', auxiliary?: { __typename?: 'Auxiliary', id: number, diaryId: number, serviceId: number, comment?: string | null } | null, errors?: Array<{ __typename?: 'AuxiliaryFieldError', field: string, message: string }> | null } };

export type CreateComprehensiveMutationVariables = Exact<{
  input: ComprehensiveInput;
}>;


export type CreateComprehensiveMutation = { __typename?: 'Mutation', createComprehensive: { __typename?: 'ComprehensiveResponse', comprehensive?: { __typename?: 'Comprehensive', id: number, name: string, isSurgery?: boolean | null, serviceCount?: number | null } | null, errors?: Array<{ __typename?: 'ComprehensiveFieldError', field: string, message: string }> | null } };

export type DeleteComprehensiveMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteComprehensiveMutation = { __typename?: 'Mutation', deleteComprehensive: boolean };

export type CreateDiagnosticMutationVariables = Exact<{
  input: DiagnosticInput;
}>;


export type CreateDiagnosticMutation = { __typename?: 'Mutation', createDiagnostic: { __typename?: 'DiagnosticResponse', diagnostic?: { __typename?: 'Diagnostic', id: number, diaryId: number, cie: string, description: string, presumptive?: string | null, definitive?: string | null, repetitive?: string | null } | null, errors?: Array<{ __typename?: 'DiagnosticFieldError', field: string, message: string }> | null } };

export type CreateDiaryMutationVariables = Exact<{
  input: DiaryInput;
}>;


export type CreateDiaryMutation = { __typename?: 'Mutation', createDiary: { __typename?: 'DiaryResponse', diary?: { __typename?: 'Diary', id: number, price: number, status: string, intervention?: string | null, interconsultation?: string | null, weight?: number | null, nextTime?: any | null, startTime: any, endTime?: any | null, createdAt: any, updatedAt: any, service: { __typename?: 'Service', id: number, title: string, description: string }, patient: { __typename?: 'Patient', id: number, dni: string, name: string, lastname: string, phone?: string | null }, vital: Array<{ __typename?: 'Vital', id: number, diaryId: number, height?: number | null, weight?: number | null, temp?: number | null, arterial?: number | null, cardiac?: number | null, respiratory?: number | null, oxygen?: number | null, comment: string }>, auxiliary: Array<{ __typename?: 'Auxiliary', id: number, diaryId: number, service?: { __typename?: 'Service', id: number, title: string } | null }>, diagnostic: Array<{ __typename?: 'Diagnostic', id: number, diaryId: number, cie: string, description: string, presumptive?: string | null, definitive?: string | null, repetitive?: string | null }>, treatment: Array<{ __typename?: 'Treatment', id: number, diaryId: number, medicine?: string | null, presentation?: string | null, quantity?: number | null, dose?: number | null, days?: number | null }>, history: Array<{ __typename?: 'History', id: number, diaryId: number, person: string, disease: string }>, disease: Array<{ __typename?: 'Disease', id: number, diaryId: number, isStart: boolean, isCourse: boolean, sickTime?: number | null, comment?: string | null }> } | null, errors?: Array<{ __typename?: 'DiaryFieldError', field: string, message: string }> | null } };

export type DeleteDiaryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteDiaryMutation = { __typename?: 'Mutation', deleteDiary: boolean };

export type UpdateDiaryStatusMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: DiaryStateInput;
}>;


export type UpdateDiaryStatusMutation = { __typename?: 'Mutation', updateDiaryStatus: { __typename?: 'DiaryResponse', diary?: { __typename?: 'Diary', id: number, price: number, status: string, intervention?: string | null, interconsultation?: string | null, weight?: number | null, nextTime?: any | null, startTime: any, endTime?: any | null, createdAt: any, updatedAt: any, service: { __typename?: 'Service', id: number, title: string, description: string }, patient: { __typename?: 'Patient', id: number, dni: string, name: string, lastname: string, phone?: string | null } } | null, errors?: Array<{ __typename?: 'DiaryFieldError', field: string, message: string }> | null } };

export type CreateDiseaseMutationVariables = Exact<{
  input: DiseaseInput;
}>;


export type CreateDiseaseMutation = { __typename?: 'Mutation', createDisease: { __typename?: 'DiseaseResponse', disease?: { __typename?: 'Disease', id: number, diaryId: number, comment?: string | null, isCourse: boolean, isStart: boolean, sickTime?: number | null } | null, errors?: Array<{ __typename?: 'DiseaseFieldError', field: string, message: string }> | null } };

export type CreateHistoryMutationVariables = Exact<{
  input: HistoryInput;
}>;


export type CreateHistoryMutation = { __typename?: 'Mutation', createHistory: { __typename?: 'HistoryResponse', history?: { __typename?: 'History', id: number, diaryId: number, disease: string, person: string } | null, errors?: Array<{ __typename?: 'HistoryFieldError', field: string, message: string }> | null } };

export type CreatePatientMutationVariables = Exact<{
  dni: Scalars['String']['input'];
}>;


export type CreatePatientMutation = { __typename?: 'Mutation', createPatient: { __typename?: 'PatientResponse', patient?: { __typename?: 'Patient', id: number, dni: string, name: string, lastname: string, phone?: string | null, diaryCount?: number | null, createdAt: any, updatedAt: any } | null, errors?: Array<{ __typename?: 'PatientFieldError', field: string, message: string }> | null } };

export type DeletePatientMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeletePatientMutation = { __typename?: 'Mutation', deletePatient: boolean };

export type CreateServiceMutationVariables = Exact<{
  input: ServiceInput;
}>;


export type CreateServiceMutation = { __typename?: 'Mutation', createService: { __typename?: 'ServiceResponse', service?: { __typename?: 'Service', id: number, title: string, description: string, comprehensive?: { __typename?: 'Comprehensive', id: number, name: string } | null } | null, errors?: Array<{ __typename?: 'ServiceFieldError', field: string, message: string }> | null } };

export type CreateTreatmentMutationVariables = Exact<{
  input: TreatmentInput;
}>;


export type CreateTreatmentMutation = { __typename?: 'Mutation', createTreatment: { __typename?: 'TreatmentResponse', treatment?: { __typename?: 'Treatment', id: number, diaryId: number, days?: number | null, dose?: number | null, medicine?: string | null, presentation?: string | null, quantity?: number | null } | null, errors?: Array<{ __typename?: 'TreatmentFieldError', field: string, message: string }> | null } };

export type CreateVitalMutationVariables = Exact<{
  input: VitalInput;
}>;


export type CreateVitalMutation = { __typename?: 'Mutation', createVital: { __typename?: 'VitalResponse', vital?: { __typename?: 'Vital', id: number, diaryId: number, height?: number | null, weight?: number | null, temp?: number | null, arterial?: number | null, cardiac?: number | null, respiratory?: number | null, oxygen?: number | null, comment: string } | null, errors?: Array<{ __typename?: 'VitalFieldError', field: string, message: string }> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number } | null };

export type ComprehensivesQueryVariables = Exact<{ [key: string]: never; }>;


export type ComprehensivesQuery = { __typename?: 'Query', comprehensives?: Array<{ __typename?: 'Comprehensive', id: number, name: string, isSurgery?: boolean | null, serviceCount?: number | null }> | null };

export type DiaryQueryVariables = Exact<{ [key: string]: never; }>;


export type DiaryQuery = { __typename?: 'Query', diary?: Array<{ __typename?: 'Diary', id: number, price: number, status: string, intervention?: string | null, interconsultation?: string | null, weight?: number | null, nextTime?: any | null, startTime: any, endTime?: any | null, createdAt: any, updatedAt: any, service: { __typename?: 'Service', id: number, title: string, description: string }, patient: { __typename?: 'Patient', id: number, dni: string, name: string, lastname: string, phone?: string | null }, vital: Array<{ __typename?: 'Vital', id: number, diaryId: number, height?: number | null, weight?: number | null, temp?: number | null, arterial?: number | null, cardiac?: number | null, respiratory?: number | null, oxygen?: number | null, comment: string }>, auxiliary: Array<{ __typename?: 'Auxiliary', id: number, diaryId: number, comment?: string | null, service?: { __typename?: 'Service', id: number, title: string } | null }>, diagnostic: Array<{ __typename?: 'Diagnostic', id: number, diaryId: number, cie: string, description: string, presumptive?: string | null, definitive?: string | null, repetitive?: string | null }>, treatment: Array<{ __typename?: 'Treatment', id: number, diaryId: number, medicine?: string | null, presentation?: string | null, quantity?: number | null, dose?: number | null, days?: number | null }>, history: Array<{ __typename?: 'History', id: number, diaryId: number, person: string, disease: string }>, disease: Array<{ __typename?: 'Disease', id: number, diaryId: number, isStart: boolean, isCourse: boolean, sickTime?: number | null, comment?: string | null }> }> | null };

export type PatientsQueryVariables = Exact<{ [key: string]: never; }>;


export type PatientsQuery = { __typename?: 'Query', patients?: Array<{ __typename?: 'Patient', id: number, dni: string, name: string, lastname: string, phone?: string | null, diaryCount?: number | null, createdAt: any, updatedAt: any }> | null };

export type AllServicesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllServicesQuery = { __typename?: 'Query', allServices?: Array<{ __typename?: 'Service', id: number, title: string, comprehensive?: { __typename?: 'Comprehensive', name: string } | null }> | null };

export type ServicesQueryVariables = Exact<{
  isSurgery: Scalars['Boolean']['input'];
}>;


export type ServicesQuery = { __typename?: 'Query', services?: Array<{ __typename?: 'Service', id: number, title: string }> | null };


export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    user {
      id
    }
    errors {
      field
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const CreateAuxiliaryDocument = gql`
    mutation CreateAuxiliary($input: AuxiliaryInput!) {
  createAuxiliary(input: $input) {
    auxiliary {
      id
      diaryId
      serviceId
      comment
    }
    errors {
      field
      message
    }
  }
}
    `;
export type CreateAuxiliaryMutationFn = Apollo.MutationFunction<CreateAuxiliaryMutation, CreateAuxiliaryMutationVariables>;

/**
 * __useCreateAuxiliaryMutation__
 *
 * To run a mutation, you first call `useCreateAuxiliaryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAuxiliaryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAuxiliaryMutation, { data, loading, error }] = useCreateAuxiliaryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAuxiliaryMutation(baseOptions?: Apollo.MutationHookOptions<CreateAuxiliaryMutation, CreateAuxiliaryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAuxiliaryMutation, CreateAuxiliaryMutationVariables>(CreateAuxiliaryDocument, options);
      }
export type CreateAuxiliaryMutationHookResult = ReturnType<typeof useCreateAuxiliaryMutation>;
export type CreateAuxiliaryMutationResult = Apollo.MutationResult<CreateAuxiliaryMutation>;
export type CreateAuxiliaryMutationOptions = Apollo.BaseMutationOptions<CreateAuxiliaryMutation, CreateAuxiliaryMutationVariables>;
export const CreateComprehensiveDocument = gql`
    mutation CreateComprehensive($input: ComprehensiveInput!) {
  createComprehensive(input: $input) {
    comprehensive {
      id
      name
      isSurgery
      serviceCount
    }
    errors {
      field
      message
    }
  }
}
    `;
export type CreateComprehensiveMutationFn = Apollo.MutationFunction<CreateComprehensiveMutation, CreateComprehensiveMutationVariables>;

/**
 * __useCreateComprehensiveMutation__
 *
 * To run a mutation, you first call `useCreateComprehensiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateComprehensiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createComprehensiveMutation, { data, loading, error }] = useCreateComprehensiveMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateComprehensiveMutation(baseOptions?: Apollo.MutationHookOptions<CreateComprehensiveMutation, CreateComprehensiveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateComprehensiveMutation, CreateComprehensiveMutationVariables>(CreateComprehensiveDocument, options);
      }
export type CreateComprehensiveMutationHookResult = ReturnType<typeof useCreateComprehensiveMutation>;
export type CreateComprehensiveMutationResult = Apollo.MutationResult<CreateComprehensiveMutation>;
export type CreateComprehensiveMutationOptions = Apollo.BaseMutationOptions<CreateComprehensiveMutation, CreateComprehensiveMutationVariables>;
export const DeleteComprehensiveDocument = gql`
    mutation DeleteComprehensive($id: Int!) {
  deleteComprehensive(id: $id)
}
    `;
export type DeleteComprehensiveMutationFn = Apollo.MutationFunction<DeleteComprehensiveMutation, DeleteComprehensiveMutationVariables>;

/**
 * __useDeleteComprehensiveMutation__
 *
 * To run a mutation, you first call `useDeleteComprehensiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteComprehensiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteComprehensiveMutation, { data, loading, error }] = useDeleteComprehensiveMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteComprehensiveMutation(baseOptions?: Apollo.MutationHookOptions<DeleteComprehensiveMutation, DeleteComprehensiveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteComprehensiveMutation, DeleteComprehensiveMutationVariables>(DeleteComprehensiveDocument, options);
      }
export type DeleteComprehensiveMutationHookResult = ReturnType<typeof useDeleteComprehensiveMutation>;
export type DeleteComprehensiveMutationResult = Apollo.MutationResult<DeleteComprehensiveMutation>;
export type DeleteComprehensiveMutationOptions = Apollo.BaseMutationOptions<DeleteComprehensiveMutation, DeleteComprehensiveMutationVariables>;
export const CreateDiagnosticDocument = gql`
    mutation CreateDiagnostic($input: DiagnosticInput!) {
  createDiagnostic(input: $input) {
    diagnostic {
      id
      diaryId
      cie
      description
      presumptive
      definitive
      repetitive
    }
    errors {
      field
      message
    }
  }
}
    `;
export type CreateDiagnosticMutationFn = Apollo.MutationFunction<CreateDiagnosticMutation, CreateDiagnosticMutationVariables>;

/**
 * __useCreateDiagnosticMutation__
 *
 * To run a mutation, you first call `useCreateDiagnosticMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDiagnosticMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDiagnosticMutation, { data, loading, error }] = useCreateDiagnosticMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDiagnosticMutation(baseOptions?: Apollo.MutationHookOptions<CreateDiagnosticMutation, CreateDiagnosticMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDiagnosticMutation, CreateDiagnosticMutationVariables>(CreateDiagnosticDocument, options);
      }
export type CreateDiagnosticMutationHookResult = ReturnType<typeof useCreateDiagnosticMutation>;
export type CreateDiagnosticMutationResult = Apollo.MutationResult<CreateDiagnosticMutation>;
export type CreateDiagnosticMutationOptions = Apollo.BaseMutationOptions<CreateDiagnosticMutation, CreateDiagnosticMutationVariables>;
export const CreateDiaryDocument = gql`
    mutation CreateDiary($input: DiaryInput!) {
  createDiary(input: $input) {
    diary {
      id
      price
      status
      intervention
      interconsultation
      weight
      nextTime
      startTime
      endTime
      createdAt
      updatedAt
      service {
        id
        title
        description
      }
      patient {
        id
        dni
        name
        lastname
        phone
      }
      vital {
        id
        diaryId
        height
        weight
        temp
        arterial
        cardiac
        respiratory
        oxygen
        comment
      }
      auxiliary {
        id
        diaryId
        service {
          id
          title
        }
      }
      diagnostic {
        id
        diaryId
        cie
        description
        presumptive
        definitive
        repetitive
      }
      treatment {
        id
        diaryId
        medicine
        presentation
        quantity
        dose
        days
      }
      history {
        id
        diaryId
        person
        disease
      }
      disease {
        id
        diaryId
        isStart
        isCourse
        sickTime
        comment
      }
    }
    errors {
      field
      message
    }
  }
}
    `;
export type CreateDiaryMutationFn = Apollo.MutationFunction<CreateDiaryMutation, CreateDiaryMutationVariables>;

/**
 * __useCreateDiaryMutation__
 *
 * To run a mutation, you first call `useCreateDiaryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDiaryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDiaryMutation, { data, loading, error }] = useCreateDiaryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDiaryMutation(baseOptions?: Apollo.MutationHookOptions<CreateDiaryMutation, CreateDiaryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDiaryMutation, CreateDiaryMutationVariables>(CreateDiaryDocument, options);
      }
export type CreateDiaryMutationHookResult = ReturnType<typeof useCreateDiaryMutation>;
export type CreateDiaryMutationResult = Apollo.MutationResult<CreateDiaryMutation>;
export type CreateDiaryMutationOptions = Apollo.BaseMutationOptions<CreateDiaryMutation, CreateDiaryMutationVariables>;
export const DeleteDiaryDocument = gql`
    mutation DeleteDiary($id: Int!) {
  deleteDiary(id: $id)
}
    `;
export type DeleteDiaryMutationFn = Apollo.MutationFunction<DeleteDiaryMutation, DeleteDiaryMutationVariables>;

/**
 * __useDeleteDiaryMutation__
 *
 * To run a mutation, you first call `useDeleteDiaryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDiaryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDiaryMutation, { data, loading, error }] = useDeleteDiaryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDiaryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDiaryMutation, DeleteDiaryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDiaryMutation, DeleteDiaryMutationVariables>(DeleteDiaryDocument, options);
      }
export type DeleteDiaryMutationHookResult = ReturnType<typeof useDeleteDiaryMutation>;
export type DeleteDiaryMutationResult = Apollo.MutationResult<DeleteDiaryMutation>;
export type DeleteDiaryMutationOptions = Apollo.BaseMutationOptions<DeleteDiaryMutation, DeleteDiaryMutationVariables>;
export const UpdateDiaryStatusDocument = gql`
    mutation UpdateDiaryStatus($id: Int!, $input: DiaryStateInput!) {
  updateDiaryStatus(id: $id, input: $input) {
    diary {
      id
      price
      status
      intervention
      interconsultation
      weight
      nextTime
      startTime
      endTime
      createdAt
      updatedAt
      service {
        id
        title
        description
      }
      patient {
        id
        dni
        name
        lastname
        phone
      }
    }
    errors {
      field
      message
    }
  }
}
    `;
export type UpdateDiaryStatusMutationFn = Apollo.MutationFunction<UpdateDiaryStatusMutation, UpdateDiaryStatusMutationVariables>;

/**
 * __useUpdateDiaryStatusMutation__
 *
 * To run a mutation, you first call `useUpdateDiaryStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDiaryStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDiaryStatusMutation, { data, loading, error }] = useUpdateDiaryStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDiaryStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDiaryStatusMutation, UpdateDiaryStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDiaryStatusMutation, UpdateDiaryStatusMutationVariables>(UpdateDiaryStatusDocument, options);
      }
export type UpdateDiaryStatusMutationHookResult = ReturnType<typeof useUpdateDiaryStatusMutation>;
export type UpdateDiaryStatusMutationResult = Apollo.MutationResult<UpdateDiaryStatusMutation>;
export type UpdateDiaryStatusMutationOptions = Apollo.BaseMutationOptions<UpdateDiaryStatusMutation, UpdateDiaryStatusMutationVariables>;
export const CreateDiseaseDocument = gql`
    mutation CreateDisease($input: DiseaseInput!) {
  createDisease(input: $input) {
    disease {
      id
      diaryId
      comment
      isCourse
      isStart
      sickTime
    }
    errors {
      field
      message
    }
  }
}
    `;
export type CreateDiseaseMutationFn = Apollo.MutationFunction<CreateDiseaseMutation, CreateDiseaseMutationVariables>;

/**
 * __useCreateDiseaseMutation__
 *
 * To run a mutation, you first call `useCreateDiseaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDiseaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDiseaseMutation, { data, loading, error }] = useCreateDiseaseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDiseaseMutation(baseOptions?: Apollo.MutationHookOptions<CreateDiseaseMutation, CreateDiseaseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDiseaseMutation, CreateDiseaseMutationVariables>(CreateDiseaseDocument, options);
      }
export type CreateDiseaseMutationHookResult = ReturnType<typeof useCreateDiseaseMutation>;
export type CreateDiseaseMutationResult = Apollo.MutationResult<CreateDiseaseMutation>;
export type CreateDiseaseMutationOptions = Apollo.BaseMutationOptions<CreateDiseaseMutation, CreateDiseaseMutationVariables>;
export const CreateHistoryDocument = gql`
    mutation CreateHistory($input: HistoryInput!) {
  createHistory(input: $input) {
    history {
      id
      diaryId
      disease
      person
    }
    errors {
      field
      message
    }
  }
}
    `;
export type CreateHistoryMutationFn = Apollo.MutationFunction<CreateHistoryMutation, CreateHistoryMutationVariables>;

/**
 * __useCreateHistoryMutation__
 *
 * To run a mutation, you first call `useCreateHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHistoryMutation, { data, loading, error }] = useCreateHistoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateHistoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateHistoryMutation, CreateHistoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateHistoryMutation, CreateHistoryMutationVariables>(CreateHistoryDocument, options);
      }
export type CreateHistoryMutationHookResult = ReturnType<typeof useCreateHistoryMutation>;
export type CreateHistoryMutationResult = Apollo.MutationResult<CreateHistoryMutation>;
export type CreateHistoryMutationOptions = Apollo.BaseMutationOptions<CreateHistoryMutation, CreateHistoryMutationVariables>;
export const CreatePatientDocument = gql`
    mutation CreatePatient($dni: String!) {
  createPatient(dni: $dni) {
    patient {
      id
      dni
      name
      lastname
      phone
      diaryCount
      createdAt
      updatedAt
    }
    errors {
      field
      message
    }
  }
}
    `;
export type CreatePatientMutationFn = Apollo.MutationFunction<CreatePatientMutation, CreatePatientMutationVariables>;

/**
 * __useCreatePatientMutation__
 *
 * To run a mutation, you first call `useCreatePatientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePatientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPatientMutation, { data, loading, error }] = useCreatePatientMutation({
 *   variables: {
 *      dni: // value for 'dni'
 *   },
 * });
 */
export function useCreatePatientMutation(baseOptions?: Apollo.MutationHookOptions<CreatePatientMutation, CreatePatientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePatientMutation, CreatePatientMutationVariables>(CreatePatientDocument, options);
      }
export type CreatePatientMutationHookResult = ReturnType<typeof useCreatePatientMutation>;
export type CreatePatientMutationResult = Apollo.MutationResult<CreatePatientMutation>;
export type CreatePatientMutationOptions = Apollo.BaseMutationOptions<CreatePatientMutation, CreatePatientMutationVariables>;
export const DeletePatientDocument = gql`
    mutation DeletePatient($id: Int!) {
  deletePatient(id: $id)
}
    `;
export type DeletePatientMutationFn = Apollo.MutationFunction<DeletePatientMutation, DeletePatientMutationVariables>;

/**
 * __useDeletePatientMutation__
 *
 * To run a mutation, you first call `useDeletePatientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePatientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePatientMutation, { data, loading, error }] = useDeletePatientMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePatientMutation(baseOptions?: Apollo.MutationHookOptions<DeletePatientMutation, DeletePatientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePatientMutation, DeletePatientMutationVariables>(DeletePatientDocument, options);
      }
export type DeletePatientMutationHookResult = ReturnType<typeof useDeletePatientMutation>;
export type DeletePatientMutationResult = Apollo.MutationResult<DeletePatientMutation>;
export type DeletePatientMutationOptions = Apollo.BaseMutationOptions<DeletePatientMutation, DeletePatientMutationVariables>;
export const CreateServiceDocument = gql`
    mutation CreateService($input: ServiceInput!) {
  createService(input: $input) {
    service {
      id
      title
      description
      comprehensive {
        id
        name
      }
    }
    errors {
      field
      message
    }
  }
}
    `;
export type CreateServiceMutationFn = Apollo.MutationFunction<CreateServiceMutation, CreateServiceMutationVariables>;

/**
 * __useCreateServiceMutation__
 *
 * To run a mutation, you first call `useCreateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServiceMutation, { data, loading, error }] = useCreateServiceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateServiceMutation(baseOptions?: Apollo.MutationHookOptions<CreateServiceMutation, CreateServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateServiceMutation, CreateServiceMutationVariables>(CreateServiceDocument, options);
      }
export type CreateServiceMutationHookResult = ReturnType<typeof useCreateServiceMutation>;
export type CreateServiceMutationResult = Apollo.MutationResult<CreateServiceMutation>;
export type CreateServiceMutationOptions = Apollo.BaseMutationOptions<CreateServiceMutation, CreateServiceMutationVariables>;
export const CreateTreatmentDocument = gql`
    mutation CreateTreatment($input: TreatmentInput!) {
  createTreatment(input: $input) {
    treatment {
      id
      diaryId
      days
      dose
      medicine
      presentation
      quantity
    }
    errors {
      field
      message
    }
  }
}
    `;
export type CreateTreatmentMutationFn = Apollo.MutationFunction<CreateTreatmentMutation, CreateTreatmentMutationVariables>;

/**
 * __useCreateTreatmentMutation__
 *
 * To run a mutation, you first call `useCreateTreatmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTreatmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTreatmentMutation, { data, loading, error }] = useCreateTreatmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTreatmentMutation(baseOptions?: Apollo.MutationHookOptions<CreateTreatmentMutation, CreateTreatmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTreatmentMutation, CreateTreatmentMutationVariables>(CreateTreatmentDocument, options);
      }
export type CreateTreatmentMutationHookResult = ReturnType<typeof useCreateTreatmentMutation>;
export type CreateTreatmentMutationResult = Apollo.MutationResult<CreateTreatmentMutation>;
export type CreateTreatmentMutationOptions = Apollo.BaseMutationOptions<CreateTreatmentMutation, CreateTreatmentMutationVariables>;
export const CreateVitalDocument = gql`
    mutation CreateVital($input: VitalInput!) {
  createVital(input: $input) {
    vital {
      id
      diaryId
      height
      weight
      temp
      arterial
      cardiac
      respiratory
      oxygen
      comment
    }
    errors {
      field
      message
    }
  }
}
    `;
export type CreateVitalMutationFn = Apollo.MutationFunction<CreateVitalMutation, CreateVitalMutationVariables>;

/**
 * __useCreateVitalMutation__
 *
 * To run a mutation, you first call `useCreateVitalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVitalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVitalMutation, { data, loading, error }] = useCreateVitalMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateVitalMutation(baseOptions?: Apollo.MutationHookOptions<CreateVitalMutation, CreateVitalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVitalMutation, CreateVitalMutationVariables>(CreateVitalDocument, options);
      }
export type CreateVitalMutationHookResult = ReturnType<typeof useCreateVitalMutation>;
export type CreateVitalMutationResult = Apollo.MutationResult<CreateVitalMutation>;
export type CreateVitalMutationOptions = Apollo.BaseMutationOptions<CreateVitalMutation, CreateVitalMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ComprehensivesDocument = gql`
    query Comprehensives {
  comprehensives {
    id
    name
    isSurgery
    serviceCount
  }
}
    `;

/**
 * __useComprehensivesQuery__
 *
 * To run a query within a React component, call `useComprehensivesQuery` and pass it any options that fit your needs.
 * When your component renders, `useComprehensivesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useComprehensivesQuery({
 *   variables: {
 *   },
 * });
 */
export function useComprehensivesQuery(baseOptions?: Apollo.QueryHookOptions<ComprehensivesQuery, ComprehensivesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ComprehensivesQuery, ComprehensivesQueryVariables>(ComprehensivesDocument, options);
      }
export function useComprehensivesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ComprehensivesQuery, ComprehensivesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ComprehensivesQuery, ComprehensivesQueryVariables>(ComprehensivesDocument, options);
        }
export function useComprehensivesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ComprehensivesQuery, ComprehensivesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ComprehensivesQuery, ComprehensivesQueryVariables>(ComprehensivesDocument, options);
        }
export type ComprehensivesQueryHookResult = ReturnType<typeof useComprehensivesQuery>;
export type ComprehensivesLazyQueryHookResult = ReturnType<typeof useComprehensivesLazyQuery>;
export type ComprehensivesSuspenseQueryHookResult = ReturnType<typeof useComprehensivesSuspenseQuery>;
export type ComprehensivesQueryResult = Apollo.QueryResult<ComprehensivesQuery, ComprehensivesQueryVariables>;
export const DiaryDocument = gql`
    query Diary {
  diary {
    id
    price
    status
    intervention
    interconsultation
    weight
    nextTime
    startTime
    endTime
    createdAt
    updatedAt
    service {
      id
      title
      description
    }
    patient {
      id
      dni
      name
      lastname
      phone
    }
    vital {
      id
      diaryId
      height
      weight
      temp
      arterial
      cardiac
      respiratory
      oxygen
      comment
    }
    auxiliary {
      id
      diaryId
      comment
      service {
        id
        title
      }
    }
    diagnostic {
      id
      diaryId
      cie
      description
      presumptive
      definitive
      repetitive
    }
    treatment {
      id
      diaryId
      medicine
      presentation
      quantity
      dose
      days
    }
    history {
      id
      diaryId
      person
      disease
    }
    disease {
      id
      diaryId
      isStart
      isCourse
      sickTime
      comment
    }
  }
}
    `;

/**
 * __useDiaryQuery__
 *
 * To run a query within a React component, call `useDiaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useDiaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDiaryQuery({
 *   variables: {
 *   },
 * });
 */
export function useDiaryQuery(baseOptions?: Apollo.QueryHookOptions<DiaryQuery, DiaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DiaryQuery, DiaryQueryVariables>(DiaryDocument, options);
      }
export function useDiaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DiaryQuery, DiaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DiaryQuery, DiaryQueryVariables>(DiaryDocument, options);
        }
export function useDiarySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DiaryQuery, DiaryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DiaryQuery, DiaryQueryVariables>(DiaryDocument, options);
        }
export type DiaryQueryHookResult = ReturnType<typeof useDiaryQuery>;
export type DiaryLazyQueryHookResult = ReturnType<typeof useDiaryLazyQuery>;
export type DiarySuspenseQueryHookResult = ReturnType<typeof useDiarySuspenseQuery>;
export type DiaryQueryResult = Apollo.QueryResult<DiaryQuery, DiaryQueryVariables>;
export const PatientsDocument = gql`
    query Patients {
  patients {
    id
    dni
    name
    lastname
    phone
    diaryCount
    createdAt
    updatedAt
  }
}
    `;

/**
 * __usePatientsQuery__
 *
 * To run a query within a React component, call `usePatientsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePatientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePatientsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePatientsQuery(baseOptions?: Apollo.QueryHookOptions<PatientsQuery, PatientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PatientsQuery, PatientsQueryVariables>(PatientsDocument, options);
      }
export function usePatientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PatientsQuery, PatientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PatientsQuery, PatientsQueryVariables>(PatientsDocument, options);
        }
export function usePatientsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PatientsQuery, PatientsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PatientsQuery, PatientsQueryVariables>(PatientsDocument, options);
        }
export type PatientsQueryHookResult = ReturnType<typeof usePatientsQuery>;
export type PatientsLazyQueryHookResult = ReturnType<typeof usePatientsLazyQuery>;
export type PatientsSuspenseQueryHookResult = ReturnType<typeof usePatientsSuspenseQuery>;
export type PatientsQueryResult = Apollo.QueryResult<PatientsQuery, PatientsQueryVariables>;
export const AllServicesDocument = gql`
    query AllServices {
  allServices {
    id
    title
    comprehensive {
      name
    }
  }
}
    `;

/**
 * __useAllServicesQuery__
 *
 * To run a query within a React component, call `useAllServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllServicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllServicesQuery(baseOptions?: Apollo.QueryHookOptions<AllServicesQuery, AllServicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllServicesQuery, AllServicesQueryVariables>(AllServicesDocument, options);
      }
export function useAllServicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllServicesQuery, AllServicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllServicesQuery, AllServicesQueryVariables>(AllServicesDocument, options);
        }
export function useAllServicesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllServicesQuery, AllServicesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllServicesQuery, AllServicesQueryVariables>(AllServicesDocument, options);
        }
export type AllServicesQueryHookResult = ReturnType<typeof useAllServicesQuery>;
export type AllServicesLazyQueryHookResult = ReturnType<typeof useAllServicesLazyQuery>;
export type AllServicesSuspenseQueryHookResult = ReturnType<typeof useAllServicesSuspenseQuery>;
export type AllServicesQueryResult = Apollo.QueryResult<AllServicesQuery, AllServicesQueryVariables>;
export const ServicesDocument = gql`
    query Services($isSurgery: Boolean!) {
  services(isSurgery: $isSurgery) {
    id
    title
  }
}
    `;

/**
 * __useServicesQuery__
 *
 * To run a query within a React component, call `useServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServicesQuery({
 *   variables: {
 *      isSurgery: // value for 'isSurgery'
 *   },
 * });
 */
export function useServicesQuery(baseOptions: Apollo.QueryHookOptions<ServicesQuery, ServicesQueryVariables> & ({ variables: ServicesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServicesQuery, ServicesQueryVariables>(ServicesDocument, options);
      }
export function useServicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServicesQuery, ServicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServicesQuery, ServicesQueryVariables>(ServicesDocument, options);
        }
export function useServicesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ServicesQuery, ServicesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ServicesQuery, ServicesQueryVariables>(ServicesDocument, options);
        }
export type ServicesQueryHookResult = ReturnType<typeof useServicesQuery>;
export type ServicesLazyQueryHookResult = ReturnType<typeof useServicesLazyQuery>;
export type ServicesSuspenseQueryHookResult = ReturnType<typeof useServicesSuspenseQuery>;
export type ServicesQueryResult = Apollo.QueryResult<ServicesQuery, ServicesQueryVariables>;