import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function PageLoader() {
    return (
        <div className="fixed inset-0 z-50 bg-white/70 flex items-center justify-center">
            <Box>
                <CircularProgress size={60} />
            </Box>
        </div>
    );
}
// D:\Web_Dev\backends\airbnb-clone frontend\src\components\utils\PageLoader.jsx
