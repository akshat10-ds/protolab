import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';
import { useState } from 'react';
import type { UploadedFile } from './FileUpload';

const meta = {
  title: 'Ink Design System/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'FileUpload component with drag and drop support, file validation, and progress tracking.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Whether to allow multiple files',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled',
    },
    showFileList: {
      control: 'boolean',
      description: 'Whether to show the file list',
    },
    maxFiles: {
      control: 'number',
      description: 'Maximum number of files',
    },
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic
export const Default: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    return (
      <FileUpload
        onFilesSelect={(selectedFiles) => {
          console.log('Files selected:', selectedFiles);
        }}
        onFileChange={setFiles}
        onFileRemove={(fileId) => {
          console.log('File removed:', fileId);
        }}
      />
    );
  },
};

export const WithLabel: Story = {
  render: () => (
    <FileUpload
      label="Upload Documents"
      helperText="Supported formats: PDF, DOC, DOCX. Max 10MB per file."
      onFilesSelect={(files) => console.log('Selected:', files)}
    />
  ),
};

export const SingleFile: Story = {
  render: () => (
    <FileUpload
      multiple={false}
      label="Profile Picture"
      placeholder="Click to select or drag and drop your profile picture"
      onFilesSelect={(files) => console.log('Selected:', files)}
    />
  ),
};

// File Type Restrictions
export const ImagesOnly: Story = {
  render: () => (
    <FileUpload
      accept="image/*"
      label="Upload Images"
      helperText="Only image files are accepted"
      placeholder="Drag and drop images here"
      onFilesSelect={(files) => console.log('Selected:', files)}
    />
  ),
};

export const PDFOnly: Story = {
  render: () => (
    <FileUpload
      accept=".pdf"
      label="Upload PDF"
      helperText="Only PDF files are accepted"
      placeholder="Click to select or drag and drop PDF files"
      onFilesSelect={(files) => console.log('Selected:', files)}
    />
  ),
};

export const DocumentsOnly: Story = {
  render: () => (
    <FileUpload
      accept=".pdf,.doc,.docx,.txt"
      label="Upload Documents"
      helperText="Accepted: PDF, DOC, DOCX, TXT"
      placeholder="Drag and drop documents here"
      onFilesSelect={(files) => console.log('Selected:', files)}
    />
  ),
};

// Size Limits
export const SmallFileSize: Story = {
  name: 'Small File Size (2MB)',
  render: () => (
    <FileUpload
      maxSize={2 * 1024 * 1024} // 2MB
      label="Upload Small Files"
      helperText="Files must be smaller than 2MB"
      onFilesSelect={(files) => console.log('Selected:', files)}
    />
  ),
};

export const LargeFileSize: Story = {
  name: 'Large File Size (50MB)',
  render: () => (
    <FileUpload
      maxSize={50 * 1024 * 1024} // 50MB
      label="Upload Large Files"
      helperText="Files up to 50MB are accepted"
      onFilesSelect={(files) => console.log('Selected:', files)}
    />
  ),
};

// Multiple Files
export const LimitedFiles: Story = {
  render: () => (
    <FileUpload
      maxFiles={3}
      label="Upload Files (Max 3)"
      helperText="You can upload up to 3 files"
      onFilesSelect={(files) => console.log('Selected:', files)}
    />
  ),
};

export const ManyFiles: Story = {
  render: () => (
    <FileUpload
      maxFiles={10}
      label="Upload Multiple Files"
      helperText="Upload up to 10 files at once"
      onFilesSelect={(files) => console.log('Selected:', files)}
    />
  ),
};

// States
export const Disabled: Story = {
  render: () => (
    <FileUpload
      disabled
      label="Upload Disabled"
      placeholder="File upload is currently disabled"
    />
  ),
};

export const WithoutFileList: Story = {
  render: () => (
    <FileUpload
      showFileList={false}
      label="Upload Files"
      helperText="Files will be uploaded but not displayed"
      onFilesSelect={(files) => console.log('Selected:', files)}
    />
  ),
};

// Real-world Use Cases
export const ProfilePhotoUpload: Story = {
  name: 'Profile Photo Upload',
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <FileUpload
        multiple={false}
        accept="image/*"
        maxSize={5 * 1024 * 1024}
        label="Profile Photo"
        placeholder="Click or drag to upload your profile photo"
        helperText="JPG, PNG or GIF. Max size 5MB."
        onFilesSelect={(files) => console.log('Selected:', files)}
      />
    </div>
  ),
};

export const DocumentUploadForm: Story = {
  name: 'Document Upload Form',
  render: () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    return (
      <div style={{
        maxWidth: '600px',
        padding: '32px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
      }}>
        <h3 style={{ marginTop: 0 }}>Upload Documents</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>
          Please upload all required documents for your application
        </p>

        <div style={{ marginTop: '24px' }}>
          <FileUpload
            accept=".pdf,.doc,.docx"
            maxFiles={5}
            maxSize={10 * 1024 * 1024}
            label="Supporting Documents"
            helperText="Upload up to 5 documents (PDF, DOC, DOCX). Max 10MB each."
            onFileChange={setFiles}
          />
        </div>

        <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
          <button
            style={{
              padding: '10px 20px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              background: 'white',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              background: files.length > 0 ? '#5000f7' : '#ccc',
              color: 'white',
              cursor: files.length > 0 ? 'pointer' : 'not-allowed',
            }}
            disabled={files.length === 0}
          >
            Submit Documents
          </button>
        </div>
      </div>
    );
  },
};

export const ImageGalleryUpload: Story = {
  name: 'Image Gallery Upload',
  render: () => (
    <div style={{ maxWidth: '700px' }}>
      <h3 style={{ marginTop: 0 }}>Upload Photos</h3>
      <FileUpload
        accept="image/*"
        maxFiles={20}
        maxSize={5 * 1024 * 1024}
        label="Gallery Images"
        placeholder="Drag and drop multiple images or click to browse"
        helperText="Upload up to 20 images. JPG, PNG. Max 5MB each."
        onFilesSelect={(files) => console.log('Selected:', files)}
      />
    </div>
  ),
};

export const AttachmentUpload: Story = {
  name: 'Email Attachment',
  render: () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    return (
      <div style={{
        maxWidth: '600px',
        padding: '24px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        background: '#f9f9f9',
      }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
            To:
          </label>
          <input
            type="email"
            placeholder="recipient@example.com"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '6px',
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
            Subject:
          </label>
          <input
            type="text"
            placeholder="Email subject"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '6px',
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
            Message:
          </label>
          <textarea
            placeholder="Type your message..."
            rows={4}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              fontFamily: 'inherit',
            }}
          />
        </div>

        <FileUpload
          maxFiles={5}
          maxSize={25 * 1024 * 1024}
          label="Attachments"
          placeholder="Add attachments"
          helperText="Max 5 files, 25MB each"
          onFileChange={setFiles}
        />

        <button
          style={{
            marginTop: '16px',
            padding: '10px 24px',
            border: 'none',
            borderRadius: '6px',
            background: '#5000f7',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Send Email
        </button>
      </div>
    );
  },
};

export const ResumeUpload: Story = {
  name: 'Resume Upload',
  render: () => (
    <div style={{
      maxWidth: '500px',
      padding: '32px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
    }}>
      <h3 style={{ marginTop: 0 }}>Apply for Position</h3>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        Upload your resume to complete your application
      </p>

      <FileUpload
        multiple={false}
        accept=".pdf,.doc,.docx"
        maxSize={5 * 1024 * 1024}
        label="Resume/CV"
        placeholder="Upload your resume (PDF or DOC)"
        helperText="PDF or Word document. Max size 5MB."
        onFilesSelect={(files) => console.log('Selected:', files)}
      />

      <div style={{
        marginTop: '24px',
        padding: '16px',
        background: '#f0f4ff',
        borderRadius: '6px',
        fontSize: '14px',
      }}>
        <strong>Tips:</strong>
        <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
          <li>Use a clear, professional file name</li>
          <li>Ensure your contact information is visible</li>
          <li>Keep it under 2 pages if possible</li>
        </ul>
      </div>
    </div>
  ),
};

export const BulkUpload: Story = {
  name: 'Bulk File Upload',
  render: () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    return (
      <div style={{ maxWidth: '800px' }}>
        <h2 style={{ marginTop: 0 }}>Bulk File Upload</h2>
        <p style={{ color: '#666' }}>
          Upload multiple files at once. All files will be processed automatically.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '24px',
          padding: '16px',
          background: '#f9f9f9',
          borderRadius: '8px',
        }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#5000f7' }}>
              {files.length}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Files Uploaded</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0ba65c' }}>
              {files.filter(f => f.status === 'success').length}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Completed</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#d42953' }}>
              {files.filter(f => f.status === 'error').length}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Failed</div>
          </div>
        </div>

        <FileUpload
          maxFiles={50}
          maxSize={100 * 1024 * 1024}
          label="Upload Files"
          placeholder="Drag and drop files here or click to browse"
          helperText="Upload up to 50 files. Max 100MB per file."
          onFileChange={setFiles}
        />
      </div>
    );
  },
};

// Playground
export const Playground: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    return (
      <FileUpload
        label="File Upload"
        placeholder="Drag and drop files here or click to browse"
        helperText="Upload your files here"
        onFileChange={setFiles}
      />
    );
  },
};
