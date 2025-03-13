import "./Sidebar.css";
import FileUpload from "./FileUpload";


interface SidebarProps {
    handleTableUpdate: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleTableUpdate }) => {
    return (
        <aside className="sidebar">
            {/* <h2>Navigation</h2> */}
            {/* <ul>
                <li>
                    <a href="#files">Files</a>
                </li>
                <li>
                    <a href="#settings">Settings</a>
                </li>
            </ul> */}

            <div className="file-upload-section">
                <h4>Upload File</h4>
                <FileUpload handleTableUpdate={handleTableUpdate} />
            </div>
        </aside>
    );
};

export default Sidebar;