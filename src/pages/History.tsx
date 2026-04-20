import { useEffect, useState } from "react";
import { API } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface HistoryItem {
  id: number;
  filename: string;
  uploaded_at: string;
  user: string;
  department: string;
  subdepartment: string;
}

const History = () => {
  const { isAdmin } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await API.get("/resumes/history/");
        setHistory(response.data);
      } catch (err) {
        setError("Failed to load history");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Upload History</h1>
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        {isAdmin ? "All Upload History" : "My Upload History"}
      </h1>

      {history.length === 0 ? (
        <p className="text-muted-foreground">No uploads found.</p>
      ) : (
        <div className="grid gap-4">
          {history.map((item) => {
            const uploadDate = new Date(item.uploaded_at);
            const formattedDate = uploadDate.toLocaleDateString();
            const formattedTime = uploadDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <Card key={item.id} className="border-2 border-slate-200 hover:border-blue-300 transition-colors duration-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{item.filename}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.department} • {item.subdepartment || "N/A"}
                  </p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <Badge variant="outline">Uploaded</Badge>
                    <span>{formattedDate} {formattedTime}</span>
                    {!isAdmin && <span className="font-medium text-foreground">By: {item.user}</span>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="uppercase tracking-wider">{item.department}</Badge>
                    {item.subdepartment && (
                      <Badge variant="secondary" className="uppercase tracking-wider">{item.subdepartment}</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;
