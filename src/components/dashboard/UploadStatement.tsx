
import React, { useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FinancialSummary, analyzeStatement } from '@/lib/deepseek';
import { FileText, Loader2, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface UploadStatementProps {
  onAnalysisComplete: (data: FinancialSummary) => void;
}

const UploadStatement: React.FC<UploadStatementProps> = ({ onAnalysisComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analyzeProgress, setAnalyzeProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Simulate upload and analysis with progress
  const simulateProgress = (setter: React.Dispatch<React.SetStateAction<number>>, onComplete: () => void) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setter(progress);
        setTimeout(onComplete, 500);
      } else {
        setter(progress);
      }
    }, 300);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    // Validate file type (CSV or PDF)
    const fileType = file.name.split('.').pop()?.toLowerCase();
    if (fileType !== 'csv' && fileType !== 'pdf') {
      toast.error('Please upload a CSV or PDF file');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    simulateProgress(setUploadProgress, () => {
      setIsUploading(false);
      handleAnalyze();
    });
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    setAnalyzeProgress(0);
    
    try {
      // Simulate analysis progress
      simulateProgress(setAnalyzeProgress, async () => {
        // Once progress is complete, call the API
        const result = await analyzeStatement(file, apiKey || undefined);
        onAnalysisComplete(result);
        setFile(null);
        setIsAnalyzing(false);
        toast.success('Statement analysis complete!');
      });
    } catch (error) {
      console.error('Error analyzing statement:', error);
      toast.error('Failed to analyze statement');
      setIsAnalyzing(false);
    }
  };

  const resetUpload = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle>Upload Statement</CardTitle>
        <CardDescription>Upload your bank statement for AI analysis</CardDescription>
      </CardHeader>
      <CardContent>
        {!file ? (
          <div
            className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-muted rounded-lg cursor-pointer hover:bg-muted/30 transition-colors"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <Upload className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="font-medium text-lg mb-1">Upload Your Statement</h3>
            <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
              Drag and drop your bank statement file (CSV or PDF), or click to browse
            </p>
            <Button variant="outline">Select File</Button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".csv,.pdf"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-muted/30 rounded-lg border border-border">
              <div className="p-2 rounded-md bg-primary/10 mr-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={resetUpload} disabled={isUploading || isAnalyzing}>
                Change
              </Button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <label htmlFor="apiKey" className="font-medium">DeepSeek API Key (Optional)</label>
                </div>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Enter your DeepSeek API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  disabled={isUploading || isAnalyzing}
                />
                <p className="text-xs text-muted-foreground">
                  Leave empty to use our demo mode for testing
                </p>
              </div>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Uploading...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {isAnalyzing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Analyzing with AI...</span>
                  <span>{Math.round(analyzeProgress)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${analyzeProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      {file && (
        <CardFooter className="pt-0">
          <Button 
            className="w-full"
            onClick={handleUpload}
            disabled={isUploading || isAnalyzing || !file}
          >
            {(isUploading || isAnalyzing) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isUploading ? 'Uploading...' : isAnalyzing ? 'Analyzing...' : 'Analyze Statement'}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default UploadStatement;
