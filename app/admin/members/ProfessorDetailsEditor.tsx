"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import type { ProfessorDetail } from "@/lib/types/database";

interface Section {
  id?: string;
  section_type: string;
  items: string[] | Record<string, string[]>;
  display_order: number;
}

interface Props {
  details: ProfessorDetail[];
  onChange: (sections: Section[]) => void;
}

const SECTION_TYPES = [
  { value: "주요 경력", isGrouped: false },
  { value: "기타 사항", isGrouped: false },
  { value: "수상 경력", isGrouped: false },
  { value: "저역서", isGrouped: false },
  { value: "지식재산권", isGrouped: false },
  { value: "연구 과제", isGrouped: true },
];

function isGroupedItems(items: unknown): items is Record<string, string[]> {
  return typeof items === "object" && items !== null && !Array.isArray(items);
}

export default function ProfessorDetailsEditor({ details, onChange }: Props) {
  const [sections, setSections] = useState<Section[]>(
    details.map((d) => ({
      id: d.id,
      section_type: d.section_type,
      items: d.items as string[] | Record<string, string[]>,
      display_order: d.display_order,
    }))
  );
  const [openSections, setOpenSections] = useState<Set<number>>(new Set());

  const update = (newSections: Section[]) => {
    setSections(newSections);
    onChange(newSections);
  };

  const toggleOpen = (index: number) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  // 새 섹션 추가
  const addSection = () => {
    const usedTypes = sections.map((s) => s.section_type);
    const available = SECTION_TYPES.find((t) => !usedTypes.includes(t.value));
    if (!available) return;

    const newSection: Section = {
      section_type: available.value,
      items: available.isGrouped ? {} : [],
      display_order: sections.length,
    };
    const newSections = [...sections, newSection];
    update(newSections);
    setOpenSections((prev) => new Set(prev).add(newSections.length - 1));
  };

  // 섹션 삭제
  const removeSection = (index: number) => {
    const newSections = sections
      .filter((_, i) => i !== index)
      .map((s, i) => ({ ...s, display_order: i }));
    update(newSections);
  };

  // 섹션 타입 변경
  const changeSectionType = (index: number, newType: string) => {
    const typeInfo = SECTION_TYPES.find((t) => t.value === newType);
    const newSections = [...sections];
    newSections[index] = {
      ...newSections[index],
      section_type: newType,
      items: typeInfo?.isGrouped ? {} : [],
    };
    update(newSections);
  };

  // === 단순 리스트 (string[]) 항목 관리 ===
  const addListItem = (sectionIndex: number) => {
    const newSections = [...sections];
    const items = newSections[sectionIndex].items as string[];
    newSections[sectionIndex] = {
      ...newSections[sectionIndex],
      items: [...items, ""],
    };
    update(newSections);
  };

  const updateListItem = (sectionIndex: number, itemIndex: number, value: string) => {
    const newSections = [...sections];
    const items = [...(newSections[sectionIndex].items as string[])];
    items[itemIndex] = value;
    newSections[sectionIndex] = { ...newSections[sectionIndex], items };
    update(newSections);
  };

  const removeListItem = (sectionIndex: number, itemIndex: number) => {
    const newSections = [...sections];
    const items = (newSections[sectionIndex].items as string[]).filter(
      (_, i) => i !== itemIndex
    );
    newSections[sectionIndex] = { ...newSections[sectionIndex], items };
    update(newSections);
  };

  // === 그룹 (Record<string, string[]>) 항목 관리 ===
  const addGroup = (sectionIndex: number) => {
    const newSections = [...sections];
    const items = { ...(newSections[sectionIndex].items as Record<string, string[]>) };
    items["새 기관"] = [""];
    newSections[sectionIndex] = { ...newSections[sectionIndex], items };
    update(newSections);
  };

  const renameGroup = (sectionIndex: number, oldKey: string, newKey: string) => {
    const newSections = [...sections];
    const items = { ...(newSections[sectionIndex].items as Record<string, string[]>) };
    const entries = Object.entries(items).map(([k, v]) =>
      k === oldKey ? [newKey, v] : [k, v]
    );
    newSections[sectionIndex] = {
      ...newSections[sectionIndex],
      items: Object.fromEntries(entries),
    };
    update(newSections);
  };

  const removeGroup = (sectionIndex: number, key: string) => {
    const newSections = [...sections];
    const items = { ...(newSections[sectionIndex].items as Record<string, string[]>) };
    delete items[key];
    newSections[sectionIndex] = { ...newSections[sectionIndex], items };
    update(newSections);
  };

  const addGroupItem = (sectionIndex: number, groupKey: string) => {
    const newSections = [...sections];
    const items = { ...(newSections[sectionIndex].items as Record<string, string[]>) };
    items[groupKey] = [...items[groupKey], ""];
    newSections[sectionIndex] = { ...newSections[sectionIndex], items };
    update(newSections);
  };

  const updateGroupItem = (
    sectionIndex: number,
    groupKey: string,
    itemIndex: number,
    value: string
  ) => {
    const newSections = [...sections];
    const items = { ...(newSections[sectionIndex].items as Record<string, string[]>) };
    const arr = [...items[groupKey]];
    arr[itemIndex] = value;
    items[groupKey] = arr;
    newSections[sectionIndex] = { ...newSections[sectionIndex], items };
    update(newSections);
  };

  const removeGroupItem = (sectionIndex: number, groupKey: string, itemIndex: number) => {
    const newSections = [...sections];
    const items = { ...(newSections[sectionIndex].items as Record<string, string[]>) };
    items[groupKey] = items[groupKey].filter((_, i) => i !== itemIndex);
    newSections[sectionIndex] = { ...newSections[sectionIndex], items };
    update(newSections);
  };

  // 섹션 순서 이동
  const moveSection = (index: number, direction: "up" | "down") => {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= sections.length) return;
    const newSections = [...sections];
    [newSections[index], newSections[target]] = [newSections[target], newSections[index]];
    newSections.forEach((s, i) => (s.display_order = i));
    update(newSections);
    // 열린 상태도 교환
    setOpenSections((prev) => {
      const next = new Set<number>();
      prev.forEach((i) => {
        if (i === index) next.add(target);
        else if (i === target) next.add(index);
        else next.add(i);
      });
      return next;
    });
  };

  const usedTypes = sections.map((s) => s.section_type);
  const canAddMore = SECTION_TYPES.some((t) => !usedTypes.includes(t.value));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">
          교수 상세 정보
        </h3>
        {canAddMore && (
          <button
            type="button"
            onClick={addSection}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-accent-light text-accent rounded-lg hover:bg-accent/10 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            섹션 추가
          </button>
        )}
      </div>

      {sections.length === 0 && (
        <p className="text-sm text-text-muted py-4 text-center">
          섹션이 없습니다. &quot;섹션 추가&quot; 버튼을 눌러 추가하세요.
        </p>
      )}

      {sections.map((section, sectionIndex) => {
        const isOpen = openSections.has(sectionIndex);
        const typeInfo = SECTION_TYPES.find((t) => t.value === section.section_type);
        const isGrouped = typeInfo?.isGrouped || isGroupedItems(section.items);

        return (
          <div
            key={sectionIndex}
            className="border border-border rounded-xl overflow-hidden bg-white"
          >
            {/* 섹션 헤더 */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50">
              <div className="flex flex-col gap-0.5">
                <button
                  type="button"
                  onClick={() => moveSection(sectionIndex, "up")}
                  disabled={sectionIndex === 0}
                  className="text-text-muted hover:text-text-primary disabled:opacity-30"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveSection(sectionIndex, "down")}
                  disabled={sectionIndex === sections.length - 1}
                  className="text-text-muted hover:text-text-primary disabled:opacity-30"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <select
                value={section.section_type}
                onChange={(e) => changeSectionType(sectionIndex, e.target.value)}
                className="text-sm font-medium bg-transparent border-none focus:outline-none flex-1 cursor-pointer"
              >
                {SECTION_TYPES.map((t) => (
                  <option
                    key={t.value}
                    value={t.value}
                    disabled={usedTypes.includes(t.value) && t.value !== section.section_type}
                  >
                    {t.value}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => toggleOpen(sectionIndex)}
                className="p-1 text-text-muted hover:text-text-primary"
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              <button
                type="button"
                onClick={() => removeSection(sectionIndex)}
                className="p-1 text-text-muted hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* 섹션 내용 */}
            {isOpen && (
              <div className="px-4 py-3 space-y-2">
                {isGrouped ? (
                  // 그룹형 (연구 과제)
                  <>
                    {Object.entries(section.items as Record<string, string[]>).map(
                      ([groupKey, groupItems]) => (
                        <div key={groupKey} className="border border-border/50 rounded-lg p-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              defaultValue={groupKey}
                              onBlur={(e) => {
                                if (e.target.value && e.target.value !== groupKey) {
                                  renameGroup(sectionIndex, groupKey, e.target.value);
                                }
                              }}
                              className="text-sm font-semibold text-yonsei-blue bg-transparent border-b border-transparent focus:border-accent focus:outline-none flex-1"
                              placeholder="기관명"
                            />
                            <button
                              type="button"
                              onClick={() => removeGroup(sectionIndex, groupKey)}
                              className="p-1 text-text-muted hover:text-red-500"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {groupItems.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-start gap-2 ml-2">
                              <input
                                type="text"
                                defaultValue={item}
                                onBlur={(e) =>
                                  updateGroupItem(sectionIndex, groupKey, itemIndex, e.target.value)
                                }
                                className="flex-1 text-xs px-2 py-1.5 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-accent/50"
                                placeholder="과제명"
                              />
                              <button
                                type="button"
                                onClick={() => removeGroupItem(sectionIndex, groupKey, itemIndex)}
                                className="p-1 text-text-muted hover:text-red-500 flex-shrink-0"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addGroupItem(sectionIndex, groupKey)}
                            className="text-xs text-accent hover:underline ml-2"
                          >
                            + 과제 추가
                          </button>
                        </div>
                      )
                    )}
                    <button
                      type="button"
                      onClick={() => addGroup(sectionIndex)}
                      className="flex items-center gap-1 text-xs text-accent hover:underline"
                    >
                      <Plus className="w-3 h-3" />
                      기관 추가
                    </button>
                  </>
                ) : (
                  // 단순 리스트형
                  <>
                    {(section.items as string[]).map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-2">
                        <span className="text-xs text-text-muted mt-2 w-5 text-right flex-shrink-0">
                          {itemIndex + 1}
                        </span>
                        <input
                          type="text"
                          defaultValue={item}
                          onBlur={(e) =>
                            updateListItem(sectionIndex, itemIndex, e.target.value)
                          }
                          className="flex-1 text-xs px-2 py-1.5 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-accent/50"
                        />
                        <button
                          type="button"
                          onClick={() => removeListItem(sectionIndex, itemIndex)}
                          className="p-1 text-text-muted hover:text-red-500 flex-shrink-0"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addListItem(sectionIndex)}
                      className="flex items-center gap-1 text-xs text-accent hover:underline"
                    >
                      <Plus className="w-3 h-3" />
                      항목 추가
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
