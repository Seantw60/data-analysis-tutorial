"use client";

import React, { useRef, useState } from "react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) onFileSelect(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition 
      ${isDragging ? "bg-blue-50 border-blue-400" : "bg-gray-50 border-gray-300"}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <p className="text-lg font-semibold mb-2">Upload Your Dataset</p>
      <p className="text-sm text-gray-600 mb-4">
        Drag & drop or click to browse
      </p>

      <p className="text-xs text-gray-500">
        Supported formats: <strong>CSV</strong>, <strong>JSON</strong>, <strong>XLSX</strong>
      </p>

      <input
        type="file"
        accept=".csv, application/json, .xlsx"
        ref={inputRef}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
