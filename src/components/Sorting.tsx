const sortFiles = (files: any[], criteria: string) => {
    const sortedFiles = [...files];
  
    switch (criteria) {
      case "size":
        return sortedFiles.sort((a, b) => b.file_size - a.file_size);
      case "name":
        return sortedFiles.sort((a, b) => a.name.localeCompare(b.name));
      case "lastModified":
        return sortedFiles.sort(
          (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      case "uploadDate":
        return sortedFiles.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "type":
        return sortedFiles.sort((a, b) => a.type.localeCompare(b.type));
      case "extension":
        return sortedFiles.sort((a, b) => a.extension.localeCompare(b.extension));
      default:
        return files;
    }

    
  };
  
  export default sortFiles;