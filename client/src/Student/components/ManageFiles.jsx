import React, { useState } from 'react';
import Navbar from '../../pages/Navbar';
import Sidebar from '../Sidebar';

function ManageFiles() {
  const [previousFiles, setPreviousFiles] = useState([
    { name: 'ProjectProposal.pdf', description: 'Initial project proposal', uploadedBy: 'Alice', path: '/path/to/ProjectProposal.pdf' },
    { name: 'DesignMockup.png', description: 'Design mockup of the project', uploadedBy: 'Bob', path: '/path/to/DesignMockup.png' },
  ]);
  
  const [isUploading, setIsUploading] = useState(false); // State to manage upload form visibility
  const [fileName, setFileName] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const [file, setFile] = useState(null); // State for the uploaded file
  
  const handleFileUpload = (e) => {
    e.preventDefault();
    
    const newFile = {
      name: fileName,
      description: fileDescription,
      uploadedBy: 'Prathamesh', // Replace with the actual user's name
      path: `/path/to/${fileName}`, // Placeholder path for demonstration
    };
    
    setPreviousFiles((prev) => [...prev, newFile]);
    
    // Reset states
    setFileName('');
    setFileDescription('');
    setFile(null);
    setIsUploading(false); // Hide upload form after submission
  };

  const handleFileRemove = (index) => {
    setPreviousFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      
      <div className='main-content p-4'>
        <div className="manage-files-container bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Manage Project Files</h2>
          
          {/* Show Upload Button */}
          {!isUploading ? (
            <button 
              onClick={() => setIsUploading(true)} 
              className="bg-blue-600 text-white rounded-md px-4 py-2 mb-6 hover:bg-blue-700 transition duration-200"
            >
              Upload File
            </button>
          ) : (
            // Upload Form
            <form onSubmit={handleFileUpload} className="mb-6">
              <div className="mb-4">
                <input 
                  type="text" 
                  placeholder="File Name" 
                  value={fileName} 
                  onChange={(e) => setFileName(e.target.value)} 
                  required 
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <input 
                  type="text" 
                  placeholder="Description" 
                  value={fileDescription} 
                  onChange={(e) => setFileDescription(e.target.value)} 
                  required 
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <input 
                  type="file" 
                  onChange={(e) => setFile(e.target.files[0])} 
                  required 
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex justify-between">
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition duration-200"
                >
                  Submit
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsUploading(false)} 
                  className="text-red-500 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <h3 className="text-xl font-bold mb-4">Uploaded Files</h3>
          <ul className="file-list space-y-4">
            {previousFiles.map((file, index) => (
              <li key={index} className="file-item flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm transition duration-200 hover:shadow-md">
                <div>
                  <a 
                    href={file.path} // Use the file path to open the file
                    target="_blank" // Open in a new tab
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {file.name}
                  </a> - <span>{file.description}</span>
                  <p className="text-sm text-gray-600">Uploaded by: {file.uploadedBy}</p>
                </div>
                <button 
                  onClick={() => handleFileRemove(index)} 
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ManageFiles;
