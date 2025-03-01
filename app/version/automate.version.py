import os
import hashlib
import json
import csv
import yaml  # Requires PyYAML: pip install pyyaml
from datetime import datetime, UTC  # Use UTC for timezone-aware timestamps

def generate_file_hash(file_path):
    """Generate MD5 hash for a file."""
    hash_md5 = hashlib.md5()
    try:
        with open(file_path, "rb") as f:
            for chunk in iter(lambda: f.read(4096), b""):
                hash_md5.update(chunk)
        return hash_md5.hexdigest()
    except Exception as e:
        print(f"Error generating hash for {file_path}: {e}")
        return None

def create_manifest(directory, include_extensions=None):
    """
    Create a version manifest for files in a directory.
    
    Args:
        directory (str): Path to the directory to scan.
        include_extensions (list): List of file extensions to include (e.g., ['.json', '.txt']).
                                  If None, all files are included.
    """
    manifest = {
        "version": "1.0.0",
        "timestamp": datetime.now(UTC).isoformat(),  # Use timezone-aware timestamp
        "files": []
    }

    # Ensure the directory exists
    if not os.path.exists(directory):
        print(f"Directory does not exist: {directory}")
        return manifest

    # Walk through the directory and add files to the manifest
    for root, _, files in os.walk(directory):
        for file_name in files:
            # Check file extension if include_extensions is specified
            if include_extensions:
                file_ext = os.path.splitext(file_name)[1].lower()  # Get file extension
                if file_ext not in include_extensions:
                    continue  # Skip files not in the include_extensions list

            file_path = os.path.join(root, file_name)
            try:
                file_stat = os.stat(file_path)
                file_hash = generate_file_hash(file_path)
                if file_hash:  # Only add files with valid hashes
                    manifest["files"].append({
                        "name": file_name,
                        "path": os.path.relpath(file_path, directory),  # Relative path
                        "version": "1.0.0",  # Replace with actual version logic
                        "last_modified": datetime.fromtimestamp(file_stat.st_mtime, tz=UTC).isoformat(),  # Timezone-aware
                        "hash": file_hash
                    })
            except Exception as e:
                print(f"Error processing file {file_path}: {e}")

    return manifest

def save_as_json(manifest, filename):
    """Save the manifest as a JSON file."""
    with open(filename, "w") as f:
        json.dump(manifest, f, indent=2)

def save_as_txt(manifest, filename):
    """Save the manifest as a plain text file."""
    with open(filename, "w") as f:
        f.write(f"Version: {manifest['version']}\n")
        f.write(f"Timestamp: {manifest['timestamp']}\n")
        f.write("Files:\n")
        for file in manifest["files"]:
            f.write(f"- Name: {file['name']}\n")
            f.write(f"  Path: {file['path']}\n")
            f.write(f"  Version: {file['version']}\n")
            f.write(f"  Last Modified: {file['last_modified']}\n")
            f.write(f"  Hash: {file['hash']}\n")

def save_as_csv(manifest, filename):
    """Save the manifest as a CSV file."""
    with open(filename, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["Name", "Path", "Version", "Last Modified", "Hash"])
        for file in manifest["files"]:
            writer.writerow([file["name"], file["path"], file["version"], file["last_modified"], file["hash"]])

def save_as_yaml(manifest, filename):
    """Save the manifest as a YAML file."""
    with open(filename, "w") as f:
        yaml.dump(manifest, f, default_flow_style=False)

def save_as_js(manifest, filename):
    """Save the manifest as a JavaScript file."""
    with open(filename, "w") as f:
        f.write("const versionManifest = ")
        json.dump(manifest, f, indent=2)
        f.write(";\n")

# Specify the directory to scan
project_directory = "../Website1/"  # Replace with your actual directory

# Optionally specify file extensions to include (e.g., ['.json', '.txt', '.csv', '.xml', '.yaml'])
include_extensions = None  # Set to None to include all files

# Generate the manifest
manifest = create_manifest(project_directory, include_extensions)

# Save the manifest in multiple formats
save_as_json(manifest, "version_manifest.json")
save_as_txt(manifest, "version_manifest.txt")
save_as_csv(manifest, "version_manifest.csv")
save_as_yaml(manifest, "version_manifest.yaml")
save_as_js(manifest, "version_manifest.js")

print("Version manifests created successfully!")