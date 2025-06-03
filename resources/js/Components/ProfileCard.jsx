// resources/js/Components/ProfileCard.jsx

export default function ProfileCard({ title, children, image }) {
    return (
        <div className="bg-[#2B5400] font-livvic text-white rounded-2xl p-8 relative overflow-hidden">
            {children}
            {image && (
                <img
                    src="Images/petani vector.png"
                    alt="Petani"
                    className="absolute right-4 h-auto object-contain hide-petani-xs"
                    style={{ bottom: '215px',
                             width: '200px'
                     }}
                />
            )}
        </div>
    );
}
