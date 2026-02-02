'use client';

import { ElementItem, CareTeamMember, LabResultData, LabTrendData, Doctor, PreBookingRequirement } from '../../../types/chat';
import { CareTeamDirectory } from './CareTeamDirectory';
import { LabResultView } from './LabResultView';
import { LabTrendViewer } from './LabTrendViewer';
import { DoctorsDirectory } from './DoctorsDirectory';
import { PreBookingRequirements } from './PreBookingRequirements';

interface ElementRendererProps {
  elements: ElementItem[];
  onSendMessage?: (message: string) => void;
}

function getValueFromPath(data: Record<string, unknown>, path: string): unknown {
  const parts = path.split('/');
  let current: unknown = data;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return current;
}

export function ElementRenderer({ elements, onSendMessage }: ElementRendererProps) {
  const renderComponent = (element: ElementItem) => {
    const componentDef = element.components[0];
    if (!componentDef) return null;

    const { id } = componentDef;
    const data = element.data;

    switch (id) {
      case 'CareTeamDirectory': {
        const config = componentDef.component.CareTeamDirectory as Record<string, { literalString?: string; path?: string }>;
        const title = config.title?.literalString || 'Care Team';
        const membersPath = config.members?.path || 'patient/careTeam';
        const members = getValueFromPath(data, membersPath) as CareTeamMember[] || [];
        return <CareTeamDirectory title={title} members={members} onSendMessage={onSendMessage} />;
      }

      case 'LabResultView': {
        const labResultData: LabResultData = {
          name: (data.name as string) || '',
          formattedValue: (data.formattedValue as string) || '',
          unit: (data.unit as string) || '',
          flag: (data.flag as string) || '',
          date: (data.date as string) || '',
        };
        return <LabResultView data={labResultData} />;
      }

      case 'LabTrendViewer': {
        const config = componentDef.component.LabTrendViewer as Record<string, { path?: string }>;
        const titlePath = config.title?.path || 'labHistory/testName';
        const pointsPath = config.dataPoints?.path || 'labHistory/points';
        const analysisPath = config.insightLine?.path || 'labHistory/analysis';

        const labTrendData: LabTrendData = {
          testName: (getValueFromPath(data, titlePath) as string) || '',
          points: (getValueFromPath(data, pointsPath) as LabTrendData['points']) || [],
          analysis: (getValueFromPath(data, analysisPath) as string) || '',
        };
        return <LabTrendViewer data={labTrendData} />;
      }

      case 'DoctorsDirectory': {
        const doctors = (data.doctors as Doctor[]) || [];
        return <DoctorsDirectory doctors={doctors} onSendMessage={onSendMessage} />;
      }

      case 'root': {
        // Handle nested component configs like PreBookingRequirements
        const componentConfig = componentDef.component;

        if ('PreBookingRequirements' in componentConfig) {
          const config = componentConfig.PreBookingRequirements as Record<string, { literalString?: string; path?: string }>;
          const requirementsPath = config.requirements?.path || 'bookingContext/prerequisites';
          const acknowledgmentText = config.acknowledgmentText?.literalString || 'I agree to the terms.';
          const requirements = (getValueFromPath(data, requirementsPath) as PreBookingRequirement[]) || [];
          return (
            <PreBookingRequirements
              requirements={requirements}
              acknowledgmentText={acknowledgmentText}
              onSendMessage={onSendMessage}
            />
          );
        }

        return (
          <div className="bg-muted rounded-lg p-3 text-sm text-muted-foreground">
            Unknown root component configuration
          </div>
        );
      }

      default:
        return (
          <div className="bg-muted rounded-lg p-3 text-sm text-muted-foreground">
            Unknown component type: {id}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {elements.map((element, index) => (
        <div key={index} className="w-full">
          {renderComponent(element)}
        </div>
      ))}
    </div>
  );
}
