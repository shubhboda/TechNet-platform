import React from 'react';
import Icon from './AppIcon';

const ResumePreview = ({ data, template }) => {
  const renderModernTemplate = () => (
    <div className="bg-white text-gray-900 p-8 max-w-4xl mx-auto shadow-lg">
      {/* Header */}
      <div className="border-b-4 border-blue-600 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <p className="text-lg text-gray-600 mb-2">{data.personalInfo.title || 'Professional Title'}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Icon name="Mail" size={14} className="mr-1" />
            {data.personalInfo.email}
          </div>
          <div className="flex items-center">
            <Icon name="Phone" size={14} className="mr-1" />
            {data.personalInfo.phone}
          </div>
          <div className="flex items-center">
            <Icon name="MapPin" size={14} className="mr-1" />
            {data.personalInfo.location}
          </div>
          {data.personalInfo.linkedin && (
            <div className="flex items-center">
              <Icon name="Linkedin" size={14} className="mr-1" />
              {data.personalInfo.linkedin}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Professional Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-blue-200 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{exp.title}</h3>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-blue-600 font-medium mb-1">{exp.company}</p>
                <p className="text-sm text-gray-600 mb-2">{exp.location}</p>
                <p className="text-gray-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {skill.name} ({skill.level})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">{edu.degree}</h3>
                <span className="text-sm text-gray-600">{edu.graduationYear}</span>
              </div>
              <p className="text-blue-600">{edu.institution}</p>
              {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderCreativeTemplate = () => (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 text-gray-900 p-8 max-w-4xl mx-auto shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <p className="text-xl text-gray-600 mb-4">{data.personalInfo.title || 'Creative Professional'}</p>
        <div className="flex justify-center flex-wrap gap-6 text-sm text-gray-600">
          <div className="flex items-center">
            <Icon name="Mail" size={14} className="mr-2" />
            {data.personalInfo.email}
          </div>
          <div className="flex items-center">
            <Icon name="Phone" size={14} className="mr-2" />
            {data.personalInfo.phone}
          </div>
          <div className="flex items-center">
            <Icon name="MapPin" size={14} className="mr-2" />
            {data.personalInfo.location}
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-purple-600 mb-3">About Me</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-purple-600 mb-6 text-center">Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                  <span className="text-sm text-purple-600 font-medium">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-lg text-purple-600 mb-2">{exp.company}</p>
                <p className="text-sm text-gray-600 mb-3">{exp.location}</p>
                <p className="text-gray-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-purple-600 mb-6 text-center">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.skills.map((skill, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm text-center">
                <h3 className="font-semibold text-gray-900 mb-1">{skill.name}</h3>
                <span className="text-sm text-purple-600">{skill.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderMinimalTemplate = () => (
    <div className="bg-white text-gray-900 p-8 max-w-4xl mx-auto shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light text-gray-900 mb-2">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <p className="text-lg text-gray-600 mb-4">{data.personalInfo.title || 'Professional'}</p>
        <div className="text-sm text-gray-500 space-y-1">
          <p>{data.personalInfo.email} • {data.personalInfo.phone}</p>
          <p>{data.personalInfo.location}</p>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8 text-center">
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-6 border-b border-gray-300 pb-2">Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{exp.title}</h3>
                  <span className="text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-600 mb-1">{exp.company}, {exp.location}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-6 border-b border-gray-300 pb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="text-sm text-gray-600">
                {skill.name}{index < data.skills.length - 1 ? ' •' : ''}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderProfessionalTemplate = () => (
    <div className="bg-white text-gray-900 p-8 max-w-4xl mx-auto shadow-lg">
      {/* Header */}
      <div className="border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <p className="text-lg text-gray-600 mb-3">{data.personalInfo.title || 'Professional'}</p>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p>{data.personalInfo.email}</p>
            <p>{data.personalInfo.phone}</p>
          </div>
          <div>
            <p>{data.personalInfo.location}</p>
            {data.personalInfo.linkedin && <p>{data.personalInfo.linkedin}</p>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">EXECUTIVE SUMMARY</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">PROFESSIONAL EXPERIENCE</h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900">{exp.title}</h3>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{exp.company} | {exp.location}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">CORE COMPETENCIES</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-700">{skill.name}</span>
                <span className="text-gray-600 text-sm">{skill.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return renderModernTemplate();
      case 'creative':
        return renderCreativeTemplate();
      case 'minimal':
        return renderMinimalTemplate();
      case 'professional':
        return renderProfessionalTemplate();
      default:
        return renderModernTemplate();
    }
  };

  return (
    <div className="resume-preview">
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;
