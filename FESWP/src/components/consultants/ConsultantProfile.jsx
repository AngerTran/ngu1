import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ConsultantProfile.css';

const ConsultantProfile = () => {
    const { consultantId } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConsultant = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/public/consultants/${consultantId}`);
                setProfile(res.data);
            } catch (err) {
                console.error('❌ Lỗi:', err);
                alert('Không thể tải hồ sơ tư vấn viên!');
            } finally {
                setLoading(false);
            }
        };

        fetchConsultant();
    }, [consultantId]);

    if (loading) return <p>Đang tải...</p>;
    if (!profile) return <p>Không tìm thấy hồ sơ.</p>;

    return (
        <div className="consultant-profile-wrapper">
            <div className="consultant-profile-card">
                <img
                    className="consultant-profile-avatar"
                    src={
                        profile.avatarUrl?.trim()
                            ? profile.avatarUrl
                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName)}&background=667eea&color=fff`
                    }
                    alt={profile.fullName}
                />

                <h2 className="consultant-profile-name">{profile.fullName}</h2>

                <div className="consultant-profile-details">
                    <p><strong>Giới tính:</strong> {profile.gender ? 'Nam' : 'Nữ'}</p>
                    <p><strong>Ngày sinh:</strong> {profile.dateOfBirth || 'Chưa cập nhật'}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Điện thoại:</strong> {profile.phone}</p>
                    <p><strong>Địa chỉ:</strong> {profile.address || 'Chưa cập nhật'}</p>
                    <p><strong>Chuyên khoa:</strong> {profile.specialty || profile.specialization || 'Chưa cập nhật'}</p>
                    <p><strong>Phí tư vấn:</strong> {profile.consultationFee ? `${profile.consultationFee} VNĐ` : 'Chưa cập nhật'}</p>
                    <p><strong>Kinh nghiệm:</strong> {profile.experienceYears ? `${profile.experienceYears} năm` : 'Chưa cập nhật'}</p>
                    <p><strong>Học vấn:</strong> {profile.education || 'Chưa cập nhật'}</p>
                    <p><strong>Chứng chỉ:</strong> {profile.certifications || 'Chưa cập nhật'}</p>
                </div>
            </div>
        </div>
    );
};

export default ConsultantProfile;
