import { IFSCCodeDetails } from '../types';
import { Check, X, Clock, Database, Cpu } from 'lucide-react';

interface ResultCardProps {
  data: IFSCCodeDetails;
  loading?: boolean;
}

export const ResultCard = ({ data, loading }: ResultCardProps) => {
  const formatBoolean = (value: boolean) => (
    <span className={`inline-flex items-center gap-1 ${value ? 'text-green-400' : 'text-red-400'}`}>
      {value ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
      {value ? 'Yes' : 'No'}
    </span>
  );

  const MetaInfo = () => (
    <div className="flex items-center gap-4 text-sm text-gray-400 mt-4 pt-4 border-t border-dark-700">
      {data.fromCache && (
        <span className="flex items-center gap-1">
          <Cpu className="w-4 h-4" />
          From Cache
        </span>
      )}
      {data.fromDatabase && (
        <span className="flex items-center gap-1">
          <Database className="w-4 h-4" />
          From Database
        </span>
      )}
      {data.updatedAt && (
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          Updated: {new Date(data.updatedAt).toLocaleDateString()}
        </span>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 animate-pulse">
        <div className="h-6 bg-dark-700 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-dark-700 rounded w-3/4"></div>
          <div className="h-4 bg-dark-700 rounded w-1/2"></div>
          <div className="h-4 bg-dark-700 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-2">{data.IFSC}</h2>
      <p className="text-lg text-gray-300 mb-6">{data.BANK} - {data.BRANCH}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-1">Address</h3>
            <p className="text-white">{data.ADDRESS || 'N/A'}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-1">Location</h3>
            <p className="text-white">
              {[data.CITY, data.DISTRICT, data.STATE].filter(Boolean).join(', ') || 'N/A'}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-1">Contact</h3>
            <p className="text-white">{data.CONTACT || 'N/A'}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-1">MICR</h3>
            <p className="text-white">{data.MICR || 'N/A'}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Services</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-gray-400 text-sm">UPI: </span>
                {formatBoolean(data.UPI)}
              </div>
              <div>
                <span className="text-gray-400 text-sm">NEFT: </span>
                {formatBoolean(data.NEFT)}
              </div>
              <div>
                <span className="text-gray-400 text-sm">RTGS: </span>
                {formatBoolean(data.RTGS)}
              </div>
              <div>
                <span className="text-gray-400 text-sm">IMPS: </span>
                {formatBoolean(data.IMPS)}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-1">SWIFT</h3>
            <p className="text-white">{data.SWIFT || 'N/A'}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-1">Bank Code</h3>
            <p className="text-white">{data.BANKCODE}</p>
          </div>
        </div>
      </div>

      <MetaInfo />
    </div>
  );
};