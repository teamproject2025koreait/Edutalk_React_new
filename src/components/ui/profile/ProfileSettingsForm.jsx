import React, { useState, useEffect } from 'react';
import AuthInput from '../auth/Input';
import AuthButton from '../auth/Button';
import { useProfile } from '../../../hooks/useProfile'; // useProfile 훅 임포트

const ProfileSettingsForm = ({ onClose }) => {
  const { profile, updateProfile, isLoading: isProfileLoading } = useProfile();

  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bio, setBio] = useState(''); // bio 상태 추가
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setAvatarUrl(profile.avatar || '');
      setBio(profile.bio || ''); // bio 상태 설정
    }
  }, [profile]);

  const handleSave = async () => {
    // 에러 상태 초기화
    setPasswordError('');
    setCurrentPasswordError('');

    // 비밀번호 변경 로직 (현재는 목업이므로 단순 유효성 검사만 수행)
    if (newPassword) {
      if (!currentPassword) {
        setCurrentPasswordError('현재 비밀번호를 입력해주세요.');
        return;
      }
      if (newPassword !== confirmNewPassword) {
        setPasswordError('새 비밀번호가 일치하지 않습니다.');
        return;
      }
      // 실제 백엔드에서는 현재 비밀번호가 맞는지 검증하는 로직이 필요합니다.
    }

    const updatedData = {
      name,
      avatar: avatarUrl,
      bio,
    };

    // 비밀번호 필드가 채워졌을 경우에만 업데이트 데이터에 포함
    if (newPassword) {
      updatedData.password = newPassword; // 실제로는 해싱 등 처리 필요
    }

    const result = await updateProfile(updatedData);
    if (result.success) {
      onClose(); // 저장 성공 시 모달 닫기
    }
  };

  if (isProfileLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <AuthInput
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
        />
      </div>
      <div>
        <AuthInput
          id="avatarUrl"
          name="avatarUrl"
          type="text"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          placeholder="프로필 사진 URL"
        />
        {avatarUrl && (
          <img src={avatarUrl} alt="프로필 미리보기" className="mt-2 w-20 h-20 rounded-full object-cover" />
        )}
      </div>
      <div>
        <textarea
          id="bio"
          name="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="자기소개"
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary-500 transition duration-200 bg-gray-50"
          rows="3"
        />
      </div>
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-lg font-semibold mb-2">비밀번호 변경</h3>
        <div>
          <AuthInput
            id="currentPassword"
            name="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="현재 비밀번호"
            isPassword={true}
            error={currentPasswordError}
          />
        </div>
        <div className="mt-2">
          <AuthInput
            id="newPassword"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새 비밀번호"
            isPassword={true}
          />
          <p className="mt-1 text-sm text-gray-500">8자 이상, 영문과 숫자 조합 권장</p>
        </div>
        <div className="mt-2">
          <AuthInput
            id="confirmNewPassword"
            name="confirmNewPassword"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="새 비밀번호 확인"
            isPassword={true}
            error={passwordError}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        <AuthButton
          onClick={onClose}
          isPrimary={false}
        >
          취소
        </AuthButton>
        <AuthButton
          onClick={handleSave}
          isPrimary={true}
          disabled={isProfileLoading} // 저장 중 비활성화
        >
          {isProfileLoading ? '저장 중...' : '저장'}
        </AuthButton>
      </div>
    </div>
  );
};

export default ProfileSettingsForm;
